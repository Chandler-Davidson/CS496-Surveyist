import React, { useState } from 'react';
import { withRouter } from 'next/router';
import Get, { Post, GetValue } from '../components/getData';

import Page from '../components/page';
import Question from '../components/question';
import Button from 'react-bootstrap/Button';
import { ButtonToolbar } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const getQuestions = questionElements => {
  return questionElements.map(q => ({
    question: q.children[1].value,
    selectionType:
      q.children[2].innerText === 'SelectionType' ? '' : q.children[2].innerText
  }));
};

const sendQuestions = (surveyId, questions) => {
  Post('AddQuestionsToSurvey', { surveyId: surveyId, questions: questions });
};

function Questions(props) {
  const { surveyId } = props.router.query;
  const visData = GetValue(Get(`PreviousSurvey/${surveyId}`));

  const [questions, setQuestions] = useState([
    { question: 'New question', selectionType: 'SelectionType' }
  ]);

  return (
    <Page>
      {visData.chartData ? (
        <Line
          style={{ maxHeight: '400px' }}
          data={visData.chartData}
          onClick={(a, b, c) => {
            console.log(a);
            console.log(b);
          }}
          options={{
            onClick: (e, i) => {
              console.log(i);
            }
          }}
        />
      ) : (
        <></>
      )}

      <div>
        {questions.map(x => (
          <Question
            key={x.question}
            selectionType={x.selectionType}
            question={x.question}
          />
        ))}
      </div>

      <ButtonToolbar style={{ marginTop: '5px' }}>
        <Button
          onClick={() =>
            setQuestions([
              ...questions,
              { question: 'New question', selectionType: 'SelectionType' }
            ])
          }
        >
          New Question
        </Button>
        <Button
          onClick={() =>
            sendQuestions(
              surveyId,
              getQuestions([...document.getElementsByClassName('question')])
            )
          }
        >
          Submit Survey
        </Button>
      </ButtonToolbar>
    </Page>
  );
}

export default withRouter(Questions);
