import React from 'react';
import { withRouter } from 'next/router';
import Page from '../components/page';
import Get, { GetValue } from '../components/getData';
import { Line } from 'react-chartjs-2';

function Previous(props) {
  const { surveyId } = props.router.query;
  const survey = GetValue(Get(`PreviousSurvey/${surveyId}`));
  console.log(survey);

  if (survey != []) {
    return (
      <Page>
        <h1>{survey.name}</h1>
        <Line
          style={{ maxHeight: '400px' }}
          data={survey.chartData}
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
      </Page>
    );
  }
}

export default withRouter(Previous);
