import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="#home">Surveyist</Navbar.Brand>
    </Navbar>
  );
}
