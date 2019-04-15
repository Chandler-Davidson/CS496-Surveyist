using System;
using System.IO;
using System.Linq;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using Nancy;
using Nancy.Extensions;
using Nancy.Json;
using Nancy.ModelBinding;
using Nancy.Responses;

namespace SurveyistServer
{
    public class Endpoint : NancyModule
    {
        public Endpoint()
        {
            Options["/{catchAll*}"] = parmeters => { return new Response {StatusCode = HttpStatusCode.Accepted}; };

            After.AddItemToEndOfPipeline(context =>
            {
                context.Response.WithHeader("Access-Control-Allow-Origin", "*")
                    .WithHeader("Access-Control-Allow-Methods", "POST, GET")
                    .WithHeader("Access-Control-Allow-Headers", "Accept, Origin, Content-type");
            });

            Get[nameof(ChartTypes)] = _ => ChartTypes();
            Get[nameof(PreviousSurvey)] = _ => PreviousSurvey();
            Get[$"{nameof(PreviousSurvey)}/{{surveyId}}"] = parameters => PreviousSurvey(parameters.surveyId);
            //Get[nameof(RuleDefinitions)] = _ => RuleDefinitions();
            Post[nameof(NewSurvey), true] = async (parameters, token) => NewSurvey();
        }

        internal DatabaseManager DatabaseManager { get; } = new DatabaseManager();

        private Response PreviousSurvey()
        {
            var docCollection = DatabaseManager.GetDocuments("PreviousSurveys");

            return docCollection.AsResponse();
        }

        private Response PreviousSurvey(string surveyId)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("surveyId", surveyId);

            var docCollection = DatabaseManager.GetDocuments("SurveyDetails", filter);

            return docCollection.AsResponse();
        }

        private Response ChartTypes()
        {
            var docCollection = DatabaseManager.GetDocuments("ChartTypes");

            return docCollection.AsResponse();
        }

        private Response NewSurvey()
        {
            try
            {
                var surveyConfig = Request.Form;

                var surveyId = Guid.NewGuid();
                surveyConfig["surveyId"] = surveyId;
                surveyConfig["timeCreated"] = DateTime.UtcNow.ToString("o");

                // Convert to json intermediate, because Mongo can't handle dynamic dictionary
                var briefJson = new JavaScriptSerializer().Serialize(surveyConfig);

                // Insert into reference collection
                var previousSurveys = DatabaseManager.GetCollection("PreviousSurveys");
                previousSurveys.InsertOne(BsonDocument.Parse(briefJson));

                //var fileStream = Request.Files.FirstOrDefault()?.Value;

                //var bytes = new byte[fileStream.Length];
                //fileStream.Position = 0;
                //fileStream.Read(bytes, 0, (int)fileStream.Length);
                //var fileContents = Encoding.ASCII.GetString(bytes);


                ////surveyConfig["data"] = new JavaScriptSerializer().DeserializeObject(fileContents);
                //var detailedJson = new JavaScriptSerializer().Serialize(surveyConfig);

                //// Insert into detailed collection
                //var surveyDetails = DatabaseManager.GetCollection("SurveyDetails");
                //surveyDetails.InsertOne(detailedJson);

                return new TextResponse(surveyId.ToString())
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception e)
            {

                throw;
            }

            return HttpStatusCode.BadRequest;
        }
    }

    public static class NancyMongoDBExtensions
    {
        public static Response AsResponse(this IAsyncCursor<BsonDocument> cursor)
        {
            var contents = cursor.ToList();

            var json = contents.ToJson(new JsonWriterSettings {OutputMode = JsonOutputMode.Strict});
            var response = new TextResponse(json, "application/json");

            return response;
        }
    }
}