import React, { useState, useEffect } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Page from '../components/page';
import Get, { GetValue } from '../components/getData';
import SurveyCard from '../components/surveyCard';

const toSurveyCard = props => <SurveyCard key={props.name} survey={props} />;

export default function Home() {
  const previousSurveys = GetValue(Get('PreviousSurveys'));
  console.log(previousSurveys);

  const surveyCards = previousSurveys.map(toSurveyCard);

  return (
    <Page>
      <div>{surveyCards}</div>

      <ButtonToolbar style={{ marginTop: '10px' }}>
        <Button href="/newSurvey">New Survey</Button>
      </ButtonToolbar>
    </Page>
  );
}
