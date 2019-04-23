using System.Linq;
using MongoDB.Driver;

namespace SurveyistServer
{
    internal class UserRepository : Repository<User>
    {
        private const string defaultCollectionPath = @"..\..\Resources\defaultUsers";

        public UserRepository(string collectionName) : base(collectionName)
        {
            Database.EnsureDefaultCollection(collectionName, defaultCollectionPath);
        }

        public bool ValidateUser(User user)
        {
            var userAndPassFilter = FilterBuilder.And(new[]
            {
                FilterBuilder.Eq(u => u.Username, user.Username),
                FilterBuilder.Eq(u => u.Password, user.Password)
            });

            return Database.GetDocuments("Users", userAndPassFilter).Any();
        }
    }
}
