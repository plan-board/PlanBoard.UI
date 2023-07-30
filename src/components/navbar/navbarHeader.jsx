import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavBarHeader = () => {
  return (
    <>
      <Navbar
        key="header"
        expand={false}
        className="bg-body-tertiary mb-3"
        variant="light"
        style={{ background: "#ffffff" }}
      >
        <Container fluid>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${false}`}
                style={{ position: "absolute", right: "1rem" }}
              >
                Plan Board
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarHeader;
