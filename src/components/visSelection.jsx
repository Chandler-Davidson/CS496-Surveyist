import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'next/link';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function VisSelection() {
  const url =
    'https://camo.githubusercontent.com/93f6107fc0a60588aeb56a294f24cc4c62a62b96/687474703a2f2f636c2e6c792f696d6167652f334d337930413377324331462f64';

  const [selectedId, setSelectedId] = useState('null');

  return (
    <div>
      <ToggleButtonGroup
        type="radio"
        name="visSelection"
        onChange={value => setSelectedId(value)}
      >
        <ToggleButton value="line" variant="outline-light">
          <VisSelectionCard image={url} title="Line Chart" />
        </ToggleButton>
        <ToggleButton value="heat" variant="outline-light">
          <VisSelectionCard image={url} title="Line Chart" />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function VisSelectionCard(props) {
  return (
    <Card style={{ margin: '15px' }}>
      <Card.Img
        style={{ width: '95%', margin: 'auto' }}
        variant="top"
        src={props.image}
      />
      <Card.Body style={{ margin: '-5px' }}>
        <Card.Title>
          <Button href="/">
            <a style={{ color: 'black' }}>{props.title}</a>
          </Button>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
