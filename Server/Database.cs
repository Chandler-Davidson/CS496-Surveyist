using System.IO;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SurveyistServer
{
    public class Database
    {
        private static readonly MongoClient Client = new MongoClient("mongodb://localhost:27017");
        private readonly IMongoDatabase _database = Client.GetDatabase("Surveyist");

        private readonly string _defaultDocumentPath = @"..\..\defaultCharts.json";
        private readonly FilterDefinition<BsonDocument> _emptyFilter = Builders<BsonDocument>.Filter.Empty;

        public Database()
        {
            EnsureDefaultCollection("ChartTypes", _defaultDocumentPath);
        }

        private void EnsureDefaultCollection(string collectionName, string collectionPath)
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
            var collectionCursor = database.ListCollections(new ListCollectionsOptions {Filter = filter});
            return collectionCursor.Any();
        }

        internal IMongoCollection<BsonDocument> GetCollection(string collectionName)
        {
            // Wrapper to fetch collection
            return _database.GetCollection<BsonDocument>(collectionName);
        }

        internal IAsyncCursor<BsonDocument> GetDocuments(string collectionName,
            FilterDefinition<BsonDocument> filter = null)
        {
            // Get collection
            var collection = GetCollection(collectionName);

            // Apply filter if not null, otherwise get all
            filter = filter ?? _emptyFilter;

            // Return docs
            return collection.FindSync<BsonDocument>(filter);
        }

        internal void InsertNewDocument(string collectionName, string contents)
        {
            // Create a new document
            var newDoc = BsonDocument.Parse(contents);

            // Fetch collection
            var collection = GetCollection(collectionName);

            // Insert document
            collection.InsertOne(newDoc);
        }
    }
}