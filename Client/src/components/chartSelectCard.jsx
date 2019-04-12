import React from "react";
import { Card } from "react-bootstrap";

export default function ChartSelectionCard(props) {
  const { name } = props.chart;

  console.log(name);
  return (
    <div style={{ width: "18rem" }}>
      {/* <Card style={{ width: "18rem" }}>
        <Card.Img
          style={{ width: "95%", margin: "5px" }}
          variant="top"
          src="https://www.smartsheet.com/sites/default/files/ic-line-charts-excel-misleading3-both.png"
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
      </Card> */}
      <img
        style={{ width: "95%" }}
        src="https://www.smartsheet.com/sites/default/files/ic-line-charts-excel-misleading3-both.png"
      />
      <h2>{name}</h2>
    </div>
  );
}
