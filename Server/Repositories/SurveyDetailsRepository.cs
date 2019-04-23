using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;

namespace SurveyistServer
{
    internal class SurveyDetailsRepository : Repository<SurveyDetails>
    {
        public SurveyDetailsRepository(string collectionName) : base(collectionName)
        {
        }

        public SurveyDetails GetSurvey(Guid surveyGuid)
        {
            var filter = FilterBuilder.Eq(s => s.surveyGuid, surveyGuid.ToString());

            return Database.GetDocuments(CollectionName, filter).FirstOrDefault();
        }

        public IEnumerable<SurveyDetails> GetSurveys(Guid userGuid)
        {
            var filter = FilterBuilder.Eq(s => s.surveyorGuid, userGuid.ToString());

            return Database.GetDocuments(CollectionName, filter);
        }
    }
}
