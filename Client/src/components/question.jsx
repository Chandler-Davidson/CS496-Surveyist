import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Question(props) {
  return (
    <InputGroup>
      <FormControl placeholder="Survey question" />

      <DropdownButton
        as={InputGroup.Append}
        // variant="outline-secondary"
        title="Selection Type"
      >
        <Dropdown.Item>Point</Dropdown.Item>
        <Dropdown.Item>Area</Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
}
