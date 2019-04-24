using Nancy;
using Nancy.Json;
using Nancy.Responses;

namespace SurveyistServer
{
    public static class NancyMongoDbExtensions
    {
        private static JavaScriptSerializer JavascriptSerializer = new JavaScriptSerializer();

        public static Response AsResponse(this object item)
        {
            var json = JavascriptSerializer.Serialize(item);

            return new TextResponse(json, "application/json");
        }
    }
}
