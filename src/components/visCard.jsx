import React from 'react';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';

const surveyUrl = surveyId => `survey/?id=${surveyId}`;

export default function VisCard(props) {
  return (
    <Card style={{ maxWidth: '35%', margin: '15px' }}>
      <Card.Img
        style={{ width: '95%', margin: 'auto' }}
        variant="top"
        src={props.image}
      />
      <Card.Body style={{ margin: '-5px' }}>
        <Card.Title>
          <Link href="/">
            <a href={surveyUrl(props.Id)} style={{ color: 'black' }}>
              {props.title}
            </a>
          </Link>
        </Card.Title>
        <Card.Link href={`${surveyUrl(props.Id)}/submissions`}>
          {props.views} Impressions
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
