using System.Collections.Generic;
using MongoDB.Driver;

namespace SurveyistServer
{
    internal class Repository<T>
    {
        internal virtual string CollectionName { get; set; }
        internal virtual FilterDefinitionBuilder<T> FilterBuilder => Builders<T>.Filter;

        public Repository(string collectionName)
        {
            CollectionName = collectionName;
        }

        public virtual void Add(T item)
        {
            Database.InsertNewDocument(CollectionName, item);
        }

        public virtual IEnumerable<T> GetAll()
        {
            return Database.GetDocuments<T>(CollectionName);
        }
    }
}
