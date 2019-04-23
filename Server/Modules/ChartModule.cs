using System;
using System.Linq;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Responses;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SurveyistServer
{
    public class ChartModule : NancyModule
    {
        private readonly SurveyDetailsRepository SurveyDetailsRepository = new SurveyDetailsRepository("SurveyDetails");
        private readonly SurveySummaryRepository SurveySummaryRepository = new SurveySummaryRepository("SurveySummary");

        public ChartModule()
        {
            Options["/{catchAll*}"] = parameters => new Response { StatusCode = HttpStatusCode.Accepted };

            After.AddItemToEndOfPipeline(context =>
            {
                context.Response.WithHeader("Access-Control-Allow-Origin", "*")
                    .WithHeader("Access-Control-Allow-Methods", "POST, GET")
                    .WithHeader("Access-Control-Allow-Headers", "Accept, Origin, Content-type");
            });

            Get[nameof(ChartTypes)] = _ => ChartTypes();
            Get[nameof(PreviousSurveys)] = _ => PreviousSurveys();
            Get[$"{nameof(PreviousSurvey)}/{{surveyGuid}}"] = parameters => PreviousSurvey(new Guid(parameters.surveyGuid));
            Post[nameof(NewNewSurvey)] = _ => NewNewSurvey();
        }

        private Response PreviousSurveys()
        {
            var surveys = SurveySummaryRepository.GetAll();
            
            return surveys.AsResponse();
        }

        private Response PreviousSurvey(Guid surveyGuid)
        {
            var survey = SurveyDetailsRepository.GetSurvey(surveyGuid);
            
            return survey.AsResponse();
        }

        private Response ChartTypes()
        {
            var chartTypes = Database.GetDocuments<BsonDocument>("ChartTypes").FirstOrDefault();
                
            return chartTypes.AsResponse();
        }

        private Response NewNewSurvey()
        {
            var surveyDetails = this.Bind<SurveyDetails>();
            var surveySummary = (SurveySummary)surveyDetails;

            SurveyDetailsRepository.Add(surveyDetails);
            SurveySummaryRepository.Add(surveySummary);



            return HttpStatusCode.OK;
        }

        //private Response NewSurvey()
        //{
        //    var surveyConfig = Request.Form;

        //    var surveyId = Guid.NewGuid();
        //    surveyConfig["surveyId"] = surveyId;
        //    surveyConfig["date"] = DateTime.UtcNow.ToString("o");

        //    // Convert to json intermediate, because Mongo can't handle dynamic dictionary
        //    var briefJson = new JavaScriptSerializer().Serialize(surveyConfig);

        //    // Insert into reference collection
        //    DatabaseManager.InsertNewDocument("SurveySummary", briefJson);

        //    var fileStream = Request.Files.FirstOrDefault()?.Value;

        //    var bytes = new byte[fileStream.Length];
        //    fileStream.Position = 0;
        //    fileStream.Read(bytes, 0, (int)fileStream.Length);
        //    var fileContents = Encoding.ASCII.GetString(bytes);

        //    surveyConfig["chartData"] = new JavaScriptSerializer().DeserializeObject(fileContents);
        //    var detailedJson = new JavaScriptSerializer().Serialize(surveyConfig);

        //    // Insert into detailed collection
        //    DatabaseManager.InsertNewDocument("SurveyDetails", detailedJson);

        //    return new TextResponse(surveyId.ToString())
        //    {
        //        StatusCode = HttpStatusCode.OK
        //    };
        //}
    }

    public static class NancyMongoDbExtensions
    {
        public static Response AsResponse(this object item)
        {
            var json = item.ToJson();

            return new TextResponse(json, "application/json");
        }
    }
}