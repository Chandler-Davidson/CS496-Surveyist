import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";

const humanDate = date => new Date(date).toDateString();

export default function SurveyCard(props) {
  const { name, timeCreated, interactions, surveyId } = props.data;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        style={{ width: "95%", margin: "5px" }}
        variant="top"
        src="https://www.smartsheet.com/sites/default/files/ic-line-charts-excel-misleading3-both.png"
      />
      <Card.Body>
        <Link href={`/previous?surveyId${surveyId}`}>
          <Card.Title>
            <a>{name}</a>
          </Card.Title>
        </Link>
        <p>{humanDate(timeCreated)}</p>
        <p>{interactions} Interactions</p>
      </Card.Body>
    </Card>
  );
}
