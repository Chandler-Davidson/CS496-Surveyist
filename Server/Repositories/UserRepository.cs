using MongoDB.Driver;
using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Security;
using System;
using System.Linq;

namespace SurveyistServer
{
    internal class UserRepository : Repository<User>
    {
        private const string defaultCollectionPath = @"..\..\Resources\defaultUsers";

        public UserRepository(string collectionName) : base(collectionName)
        {
            Database.EnsureDefaultCollection(collectionName, defaultCollectionPath);
        }

        public User GetUser(Guid guid)
        {
            var filter = FilterBuilder.Eq(u => u.Guid, guid);

            return Database.GetDocuments(CollectionName, filter).First();
        }

        public bool ValidateUser(User user)
        {
            var userAndPassFilter = FilterBuilder.And(new[]
            {
                FilterBuilder.Eq(u => u.UserName, user.UserName),
                FilterBuilder.Eq(u => u.Password, user.Password)
            });

            return Database.GetDocuments("Users", userAndPassFilter).Any();
        }
    }

    public class UserMapper : IUserMapper
    {
        private readonly UserRepository UserRepository = new UserRepository("Users");
        public IUserIdentity GetUserFromIdentifier(Guid identifier, NancyContext context)
        {
            return UserRepository.GetUser(identifier);
        }
    }
}
