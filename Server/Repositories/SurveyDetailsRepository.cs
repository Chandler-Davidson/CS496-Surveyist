using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

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

        internal void AddQuestionsToSurvey(string surveyId, Question[] questions)
        {
            var surveyCollection = GetCollection();

            var filter = FilterBuilder.Eq(s => s.surveyGuid, surveyId);
            var update = UpdateBuilder.Set(s => s.Questions, questions);

            surveyCollection.UpdateOne(filter, update);
        }

        internal void AddAnswersToSurvey(string surveyId, PointAnswer[] answers)
        {
            try
            {
                var filter = FilterBuilder.Eq(s => s.surveyGuid, surveyId);
                var survey = Database.GetDocuments(CollectionName, filter).FirstOrDefault();

                var updatedQuestions = survey.Questions;

                for (int i = 0; i < updatedQuestions.Length; i++)
                {
                    if (updatedQuestions[i].answers == null)
                        updatedQuestions[i].answers = new PointAnswer[0]; 
                }


                for (int i = 0; i < answers.Length; i++)
                    updatedQuestions[i].answers = updatedQuestions[i].answers.Concat(new PointAnswer[] { answers[i] }).ToArray();

                survey.Questions = updatedQuestions;

                var coll = GetCollection();
                coll.DeleteOne(filter);
                Add(survey);
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}
