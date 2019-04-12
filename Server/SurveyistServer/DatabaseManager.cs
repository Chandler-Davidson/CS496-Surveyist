using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using Nancy;
using Nancy.Responses;

namespace SurveyistServer
{
    public class DatabaseManager : NancyModule
    {
        private readonly FilterDefinition<BsonDocument> _emptyFilter = Builders<BsonDocument>.Filter.Empty;

        public DatabaseManager()
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

        internal static MongoClient Client { get; } = new MongoClient("mongodb://localhost:27017");
        internal static IMongoDatabase Database { get; } = Client.GetDatabase("Surveyist");

        internal static Response GetResponse(string collectionName, FilterDefinition<BsonDocument> filter)
        {
            var collection = Database.GetCollection<BsonDocument>(collectionName);

            var docs = collection.FindSync<BsonDocument>(filter);

            return docs.AsResponse();
        }

        private Response PreviousSurveys()
        {
            return GetResponse("PreviousSurveys", _emptyFilter);
        }

        private Response ChartTypes()
        {
            return GetResponse("ChartTypes", _emptyFilter);
        }

        private Response NewSurvey()
        {
            var surveyConfig = Request.Form;

            var newDoc = BsonDocument.Parse(surveyConfig);
            var SurveyDetails = Database.GetCollection<BsonDocument>("SurveyDetails");
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