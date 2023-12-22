import { Fragment } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
  return (
    <Fragment>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">X-pense</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/home">Home</Link>
            {/* <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link> */}
          </Nav>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;
