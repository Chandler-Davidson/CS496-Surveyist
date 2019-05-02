import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { Line } from 'react-chartjs-2';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { ToggleButtonGroup } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import Page from '../components/page';
import Get, { GetValue } from '../components/getData';
import Question from '../components/question';
import { Post } from '../components/getData';

const getQuestionIndex = (questions, questionTitle) =>
  questions.indexOf(questions.find(q => q.question === questionTitle));

const sendAnswers = (surveyId, answers) => {
  (async () => {
    const response = await Post('SubmitAnswers', {
      surveyId: surveyId,
      answers: answers
    });

    if (response.status === 200) {
      alert('Thanks for your submission!');
    }
  })();
};

function User(props) {
  const { surveyId } = props.router.query;
  const survey = GetValue(Get(`PreviousSurvey/${surveyId}`));
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  let [, updateState] = React.useState();

  if (survey && survey.chartData) {
    if (surveyAnswers.length === 0)
      setSurveyAnswers(new Array(survey.questions.length).fill({}));

    const givenAnswer =
      surveyAnswers[getQuestionIndex(survey.questions, selectedQuestion)];

    let chartDatasets = [
      ...survey.chartData.datasets,
      {
        label: 'Survey Answers',
        showLine: false,
        pointRadius: 10,
        pointHoverRadius: 10,
        data: selectedQuestion
          ? Object.entries(givenAnswer).length !== 0
            ? [givenAnswer]
            : []
          : [],
        type: 'scatter'
      }
    ];

    return (
      <Page>
        <h1>{survey.name}</h1>
        <h2>{selectedQuestion ? selectedQuestion : ''}</h2>
        <Line
          style={{ maxHeight: '400px' }}
          data={{
            labels: survey.chartData.labels,
            datasets: chartDatasets
          }}
          options={{
            onClick: (e, i) => {
              const answerIndex = i[0]._index;
              const dataSet = survey.chartData.datasets[0];

              if (selectedQuestion) {
                surveyAnswers[
                  getQuestionIndex(survey.questions, selectedQuestion)
                ] = {
                  x: survey.chartData.labels[answerIndex],
                  y: dataSet.data[answerIndex]
                };
              }

              // strictly for refresh
              updateState();
            }
          }}
        />

        {survey ? (
          <ToggleButtonGroup
            type="radio"
            name="questionSelection"
            onChange={q => setSelectedQuestion(q)}
          >
            {survey.questions.map(q => (
              <ToggleButton
                variant="outline-secondary"
                key={q.question}
                value={q.question}
              >
                <Question
                  selectionType={q.selectionType}
                  question={q.question}
                />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ) : (
          <></>
        )}

        <ButtonToolbar style={{ marginTop: '5px' }}>
          <Button onClick={() => sendAnswers(surveyId, surveyAnswers)}>
            Submit Survey
          </Button>
        </ButtonToolbar>
      </Page>
    );
  } else {
    return <Page />;
  }
}

export default withRouter(User);
