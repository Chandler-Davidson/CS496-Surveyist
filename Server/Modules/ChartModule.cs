using MongoDB.Driver;
using Nancy;
using Nancy.Json;
using Nancy.ModelBinding;
using System;
using System.IO;
using System.Linq;

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
            Post[nameof(NewSurvey)] = _ => NewSurvey();
            Post[nameof(AddQuestionsToSurvey)] = _ => AddQuestionsToSurvey();
            Post[nameof(SubmitAnswers)] = _ => SubmitAnswers();
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
            var chartTypes = Database.GetDocuments<ChartTypesModel>("ChartTypes")
                .FirstOrDefault()?.chartTypes;

            return chartTypes.AsResponse();
        }

        private Response NewSurvey()
        {
            var surveyDetails = this.Bind<SurveyDetails>();

            var surveyGuid = Guid.NewGuid().ToString();
            var date = DateTime.UtcNow.ToString("o");

            var dataFile = new StreamReader(Request.Files.First().Value).ReadToEnd();

            surveyDetails.chartData = new JavaScriptSerializer().Deserialize<ChartData>(dataFile);
            surveyDetails.surveyGuid = surveyGuid;
            surveyDetails.date = date;

            // TODO: Fix auth, then come back
            //var currentUser = this.Context.CurrentUser as User;
            //surveyDetails.surveyorGuid = currentUser.Guid.ToString();

            var surveySummary = (SurveySummary)surveyDetails;

            SurveyDetailsRepository.Add(surveyDetails);
            SurveySummaryRepository.Add(surveySummary);


            return (Response)surveyGuid;
        }

        private Response AddQuestionsToSurvey()
        {
            var command = this.Bind<AddQuestionsCommand>();
            var questions = command.questions;

            SurveyDetailsRepository.AddQuestionsToSurvey(command.surveyId, questions);

            return HttpStatusCode.OK;
        }

        private Response SubmitAnswers()
        {
            var command = this.Bind<SubmitAnswersCommand>();
            var answers = command.answers;

            SurveyDetailsRepository.AddAnswersToSurvey(command.surveyId, answers);

            return HttpStatusCode.OK;
        }
    }
}