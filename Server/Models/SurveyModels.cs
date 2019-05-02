using MongoDB.Bson.Serialization.Attributes;
using System;

namespace SurveyistServer
{
    [BsonIgnoreExtraElements]
    class SurveySummary
    {
        private Guid _surveyGuid;
        public string surveyGuid { get => _surveyGuid.ToString(); set => _surveyGuid = new Guid(value); }
        public string date { get; set; }
        public string name { get; set; }
        public string chartType { get; set; }
    }

    [BsonIgnoreExtraElements]
    class SurveyDetails
    {
        private Guid _surveyGuid;
        public string surveyGuid { get => _surveyGuid.ToString(); set => _surveyGuid = new Guid(value); }

        private Guid _surveyorGuid;
        public string surveyorGuid { get => _surveyorGuid.ToString(); set => _surveyorGuid = new Guid(value); }
        public string date { get; set; }
        public string name { get; set; }
        public string chartType { get; set; }
        public ChartData chartData { get; set; }
        public Question[] Questions { get; set; }

        public static explicit operator SurveySummary(SurveyDetails surveyDetails)
        {
            return new SurveySummary
            {
                surveyGuid = surveyDetails.surveyGuid,
                date = surveyDetails.date,
                name = surveyDetails.name,
                chartType = surveyDetails.chartType
            };
        }
    }

    [BsonIgnoreExtraElements]
    class ChartData
    {
        public object[] labels { get; set; }
        public object[] datasets { get; set; }
    }

    class AddQuestionsCommand
    {
        public string surveyId { get; set; }
        public Question[] questions { get; set; }
    }

    class SubmitAnswersCommand
    {
        public string surveyId { get; set; }
        public PointAnswer[] answers { get; set; }
    }

    class Question
    {
        public string question { get; set; }
        public string selectionType { get; set; }
        public PointAnswer[] answers { get; set; }
    }

    class PointAnswer
    {
        public string x { get; set; }
        public int y { get; set; }
    }
}
