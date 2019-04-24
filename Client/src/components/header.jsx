import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/">Surveyist</Navbar.Brand>
      <Nav.Link href="/Logout" style={{ marginLeft: 'auto', color: 'white' }}>
        Logout
      </Nav.Link>
    </Navbar>
  );
}
