import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { Line } from 'react-chartjs-2';

import Page from '../components/page';
import Get, { GetValue } from '../components/getData';
import Question from '../components/question';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { ToggleButtonGroup } from 'react-bootstrap';

const getQuestionAnswers = (questions, questionTitle) =>
  questions.find(q => q.question === questionTitle).answers;

function Previous(props) {
  const { surveyId } = props.router.query;
  const survey = GetValue(Get(`PreviousSurvey/${surveyId}`));
  const [selectedQuestion, setSelectedQuestion] = useState('');

  if (survey && survey.chartData) {
    let chartDatasets = [
      ...survey.chartData.datasets,
      {
        label: 'Survey Answers',
        showLine: false,
        pointRadius: 10,
        pointHoverRadius: 10,
        data: selectedQuestion
          ? getQuestionAnswers(survey.questions, selectedQuestion)
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
          data={{ labels: survey.chartData.labels, datasets: chartDatasets }}
          options={{
            onClick: (e, i) => {
              console.log(i);
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
      </Page>
    );
  } else {
    return <Page />;
  }
}

export default withRouter(Previous);
