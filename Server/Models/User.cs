using System;
using MongoDB.Bson.Serialization.Attributes;

namespace SurveyistServer
{
    public interface IUserIdentity
    {
        string Username { get; set; }
        string Password { get; set; }
    }

    [BsonIgnoreExtraElements]
    class User : IUserIdentity
    {
        public Guid Guid { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
