import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Page from "../components/page";
import GetData from "../components/getData";
import ChartSelectCard from "../components/chartSelectCard";
import { ButtonToolbar } from "react-bootstrap";

const chartSelections = charts =>
  charts.map(chart => (
    <ToggleButton value={chart} variant="outline-dark">
      <ChartSelectCard chart={chart} />
    </ToggleButton>
  ));

const fileUploader = () => {
  if (typeof window !== "undefined")
    return document.getElementById("fileUploader");
};

export default function NewSurvey() {
  const chartTypes = GetData("ChartTypes");
  const [selectedSurvey, setSurvey] = useState("");

  return (
    <Page>
      <Form>
        <Form.Control
          style={{ margin: "5px" }}
          type="text"
          placeholder="New Survey Name"
          value={selectedSurvey}
          onChange={setSurvey}
        />

        <ToggleButtonGroup type="radio" name="chartSelection">
          {chartSelections(chartTypes.data)}
        </ToggleButtonGroup>

        <input
          type="file"
          id="fileUploader"
          style={{ display: "none" }}
          accept=".json"
        />

        <ButtonToolbar style={{ marginTop: "5px" }}>
          <Button variant="outline-dark" onClick={() => fileUploader().click()}>
            Import Data
          </Button>
        </ButtonToolbar>

        <ButtonToolbar style={{ marginTop: "5px" }}>
          <Link
            as={() =>
              `newChart/${selectedSurvey}/${fileUploader().files[0].name}`
            }
            href={() =>
              `/newChart?chart=${selectedSurvey}&data=${
                fileUploader().files[0]
              }`
            }
          >
            <Button onClick={() => console.log(fileUploader().files)}>
              Generate Survey
            </Button>
          </Link>
        </ButtonToolbar>
      </Form>
    </Page>
  );
}
