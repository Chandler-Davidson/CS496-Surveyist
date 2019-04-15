import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Page from '../components/page';
import GetData, { SendData } from '../components/getData';
import ChartSelectCard from '../components/chartSelectCard';

const chartSelections = charts =>
  charts.map((chart, i) => (
    <ToggleButton key={i} value={chart} variant="outline-dark">
      <ChartSelectCard chart={chart} />
    </ToggleButton>
  ));

const generateSurvey = surveyType => {
  const surveyName = document.getElementById('surveyName').value;
  const dataFile = document.getElementById('fileUploader').files[0];

  let formData = new FormData();
  formData.set('chartType', surveyType);
  formData.set('surveyName', surveyName);
  formData.set('data', dataFile);

  (async () => {
    const response = await SendData('NewSurvey', formData);

    if (response.status === 200) {
      Router.push(
        `/questions/?surveyId=${response.data}`,
        `newSurvey/${surveyName}`
      );
    }
  })();
};

export default function NewSurvey() {
  const chartTypes = GetData('ChartTypes');
  const [selectedSurvey, setSurvey] = useState('');

  return (
    <Page>
      <Form>
        <Form.Control
          style={{ margin: '5px' }}
          type="text"
          id="surveyName"
          placeholder="New Survey Name"
        />

        <ToggleButtonGroup
          type="radio"
          name="chartSelection"
          onChange={x => setSurvey(x.name)}
        >
          {chartSelections(chartTypes.data)}
        </ToggleButtonGroup>

        <input
          type="file"
          id="fileUploader"
          style={{ display: 'none' }}
          accept=".json"
        />

        <ButtonToolbar style={{ marginTop: '5px' }}>
          <Button
            variant="outline-dark"
            onClick={() => document.getElementById('fileUploader').click()}
          >
            Import Data
          </Button>
        </ButtonToolbar>

        <ButtonToolbar style={{ marginTop: '5px' }}>
          <Button onClick={() => generateSurvey(selectedSurvey)}>
            Generate Survey
          </Button>
        </ButtonToolbar>
      </Form>
    </Page>
  );
}
