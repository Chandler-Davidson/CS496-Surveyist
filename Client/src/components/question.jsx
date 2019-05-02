import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

export default function Question(props) {
  const [renderComponent, setRender] = useState(true);
  const [question, setQuestion] = useState(props.question);
  const [selectionType, setSelectionType] = useState(props.selectionType);
  const questionTitle = props.question ? props.question : 'Survey question';

  if (renderComponent) {
    return (
      <InputGroup style={{ width: '97%', margin: '5px' }} className="question">
        <InputGroup.Prepend>
          {props.question ? (
            <Button variant="outline-secondary" onClick={() => console.log()}>
              O
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              onClick={() => setRender(false)}
            >
              X
            </Button>
          )}
        </InputGroup.Prepend>

        <FormControl
          placeholder={questionTitle}
          disabled={props.question ? true : false}
        />

        <DropdownButton
          as={InputGroup.Append}
          title={selectionType}
          disabled={props.question ? true : false}
        >
          <Dropdown.Item eventKey="Point" onSelect={setSelectionType}>
            Point
          </Dropdown.Item>
          <Dropdown.Item eventKey="Area" onSelect={setSelectionType}>
            Area
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    );
  }

  return <></>;
}
