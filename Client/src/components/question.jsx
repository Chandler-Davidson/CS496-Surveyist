import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Question() {
  return (
    <InputGroup>
      <FormControl
        placeholder="My first question"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />

      <DropdownButton
        as={InputGroup.Append}
        variant="outline-secondary"
        title="Dropdown"
        id="input-group-dropdown-2"
      >
        <Dropdown.Item href="#">Point</Dropdown.Item>
        <Dropdown.Item href="#">Area</Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
}
