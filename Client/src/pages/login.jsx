import React, { useState } from 'react';
import Page from '../components/page';
import { Form, Button } from 'react-bootstrap';
import { Post } from '../components/getData';

async function sendLogin(username, password) {
  const credentials = { username: username, password: password };

  const response = await Post('Login', credentials);
  console.log(response);
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Page>
      <Form style={{ maxWidth: '75%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        <Button onClick={async () => await sendLogin(username, password)}>
          Login
        </Button>
      </Form>
    </Page>
  );
}
