import React, { useState } from 'react';
import { withRouter } from 'next/router';
import GetData, { GetValue } from '../components/getData';

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

function Questions(props) {
  const { surveyId } = props.router.query;
  const _visData = GetValue(GetData(`PreviousSurvey/${surveyId}`));
  const visData = _visData.length > 0 ? _visData[0].chartData : {};
  const [questions, setQuestions] = useState([
    { question: 'New question', selectionType: 'SelectionType' }
  ]);

  return (
    <Page>
      {visData ? (
        <Line
          style={{ maxHeight: '400px' }}
          data={visData}
          options={{
            onElementsClick: elems => {
              console.log(elems);
            },
            getElementsAtEvent: elems => {
              console.log(elems);
            },
            getDatasetAtEvent: dataset => {
              console.log(dataset);
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
            console.log(
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
