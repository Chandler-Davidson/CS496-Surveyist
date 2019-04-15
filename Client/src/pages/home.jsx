import React, { useState, useEffect } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Page from '../components/page';
import GetData from '../components/getData';
import SurveyCard from '../components/surveyCard';

const getAnalysisHistory = props =>
  props.map(x => <SurveyCard key={x.Name} data={x} />);

export default function Home() {
  const previousSurveys = GetData('PreviousSurvey');

  return (
    <Page>
      <div>{getAnalysisHistory(previousSurveys.data)}</div>

      <ButtonToolbar style={{ marginTop: '10px' }}>
        <Button href="/newSurvey">New Survey</Button>
      </ButtonToolbar>
    </Page>
  );
}
