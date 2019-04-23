using System.Collections.Generic;
using System.IO;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SurveyistServer
{
    public static class Database
    {
        private static readonly MongoClient Client = new MongoClient("mongodb://localhost:27017");
        private static readonly IMongoDatabase _database = Client.GetDatabase("Surveyist");

        public static void EnsureDefaultCollection(string collectionName, string collectionPath)
        {
            var defaultExist = CollectionExists(_database, collectionName);

            if (defaultExist) return;

            var contents = File.ReadAllText(collectionPath);
            _database.CreateCollection(collectionName);
            InsertNewDocument(collectionName, contents);
        }

        private static bool CollectionExists(IMongoDatabase database, string collectionName)
        {
            var filter = new BsonDocument("name", collectionName);
            var collectionCursor = database.ListCollections(new ListCollectionsOptions { Filter = filter });
            return collectionCursor.Any();
        }

        internal static IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            // Wrapper to fetch collection
            return _database.GetCollection<T>(collectionName);
        }

        internal static IEnumerable<T> GetDocuments<T>(string collectionName,
            FilterDefinition<T> filter = null)
        {
            try
            {
                // Get collection
                var collection = GetCollection<T>(collectionName);

                // Apply filter if not null, otherwise get all
                filter = filter ?? Builders<T>.Filter.Empty;

                // Return docs
                return collection.Find(filter).ToEnumerable();
            }
            catch (System.Exception e)
            {

                throw;
            }
        }

        internal static void InsertNewDocument<T>(string collectionName, T contents)
        {
            // Fetch collection
            var collection = GetCollection<T>(collectionName);

            // Insert document
            collection.InsertOne(contents);
        }
    }
}