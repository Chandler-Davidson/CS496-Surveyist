import React from 'react';
import { withRouter } from 'next/router';
import { Line } from 'react-chartjs-2';

import Page from '../components/page';
import Get, { GetValue } from '../components/getData';
import Question from '../components/question';

function Previous(props) {
  const { surveyId } = props.router.query;
  const survey = GetValue(Get(`PreviousSurvey/${surveyId}`));

  console.log(survey);

  if (survey && survey.chartData) {
    let chartData = survey.chartData;
    chartData.datasets.push({
      label: 'Survey Answers',
      showLine: false,
      pointRadius: 10,
      pointHoverRadius: 10,
      data: [
        { x: 'April', y: 81 },
        { x: 'April', y: 81 },
        { x: 'April', y: 81 },
        { x: 'March', y: 80 },
        { x: 'February', y: 59 },
        { x: 'June', y: 55 }
      ],
      type: 'scatter'
    });

    return (
      <Page>
        <h1>{survey.name}</h1>
        <Line
          style={{ maxHeight: '400px' }}
          data={chartData}
          options={{
            onClick: (e, i) => {
              console.log(i);
            }
          }}
        />

        {survey ? (
          survey.questions.map(q => (
            <Question
              key={q.question}
              selectionType={q.selectionType}
              question={q.question}
            />
          ))
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
