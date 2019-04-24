using MongoDB.Bson.Serialization.Attributes;
using Nancy.Security;
using System;
using System.Collections.Generic;

namespace SurveyistServer
{
    [BsonIgnoreExtraElements]
    class User : IUserIdentity
    {
        public Guid Guid { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public IEnumerable<string> Claims { get; set; }
    }

    class LoginCredentials
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
