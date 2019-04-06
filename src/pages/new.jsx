import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Page from '../components/page';
import VisCard from '../components/visCard';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import VisSelection from '../components/visSelection';

export default function New() {
  return (
    <Page>
      <Form
        style={{
          width: '99%',
          marginTop: '1%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Form.Group>
          <Form.Control type="text" placeholder="My Visualization Survey" />
          <VisSelection />

          <ButtonGroup>
            <Button onClick={() => console.log()}>Submit</Button>
          </ButtonGroup>
        </Form.Group>
      </Form>
    </Page>
  );
}
