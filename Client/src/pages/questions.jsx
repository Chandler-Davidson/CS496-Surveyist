import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { Line } from 'react-chartjs-2';

import Page from '../components/page';
import GetData from '../components/getData';
import Question from '../components/question';
import Button from 'react-bootstrap/Button';

function Questions(props) {
  const [questions, setQuestions] = useState([]);

  const { surveyId } = props.router.query;
  const response = GetData(`PreviousSurvey/${surveyId}`);
  const survey = response.data.length > 0 ? response.data[0] : {};

  const tSurvey = {
    _id: {
      $oid: '5cb4d1e11abda54bb02dd353'
    },
    chartType: 'Line Chart',
    surveyName: 'MyNewSurvey',
    surveyId: 'e41d5ff9-16b9-47fd-b9f2-99e2c3db2e8a',
    timeCreated: '2019-04-15T18:48:01.8004783Z'
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Example Dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  return (
    <Page>
      <h1>{tSurvey.surveyName}</h1>
      <Line data={data} />
      <div>
        <Question />
      </div>

      <Button style={{ marginTop: '5px' }}>Add New Question></Button>
    </Page>
  );
}

export default withRouter(Questions);
