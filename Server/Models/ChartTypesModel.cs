using MongoDB.Bson.Serialization.Attributes;

namespace SurveyistServer
{
    [BsonIgnoreExtraElements]
    class ChartTypesModel
    {
        public string[] chartTypes { get; set; }
    }
}
