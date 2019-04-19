import React, { useState } from 'react';
import { withRouter } from 'next/router';
import GetData, { GetValue } from '../components/getData';

import Page from '../components/page';
import Question from '../components/question';
import Button from 'react-bootstrap/Button';

function Questions(props) {
  const { surveyId } = props.router.query;
  const visData = GetValue(GetData(`PreviousSurvey/${surveyId}`))[0];
  const [questions, setQuestions] = useState([]);

  console.log(visData);

  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}

export default withRouter(Questions);
