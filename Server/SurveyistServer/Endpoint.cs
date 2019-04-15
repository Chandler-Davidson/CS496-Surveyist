using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using Nancy;
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

            Get[nameof(PreviousSurveys)] = _ => PreviousSurveys();
            Get[nameof(ChartTypes)] = _ => ChartTypes();
            //Get[$"{nameof(PreviousRun)}/{{runId}}"] = parameters => PreviousRun(parameters.runId);
            //Get[nameof(RuleDefinitions)] = _ => RuleDefinitions();
            Post[nameof(NewSurvey), true] = async (parameters, token) => NewSurvey();
        }

        internal DatabaseManager DatabaseManager { get; } = new DatabaseManager();

        private Response PreviousSurveys()
        {
            var docCollection = DatabaseManager.GetDocuments("PreviousSurveys");

            return docCollection.AsResponse();
        }

        private Response ChartTypes()
        {
            var docCollection = DatabaseManager.GetDocuments("ChartTypes");

            return docCollection.AsResponse();
        }

        private Response NewSurvey()
        {
            var surveyConfig = Request.Form;

            var newDoc = BsonDocument.Parse(surveyConfig);
            var SurveyDetails = DatabaseManager.GetCollection("SurveyDetails");
            SurveyDetails.InsertOne(newDoc);

            return HttpStatusCode.OK;
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