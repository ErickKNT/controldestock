import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBs from 'react-bootstrap/Navbar';
import './navbar.css';

const Navbar = () => {
    return (
        <NavbarBs bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBs.Collapse id="basic-navbar-nav">
                    <Nav className="nav-container justify-content-center">
                        <Nav.Item>
                            <Link to='/' className="nav-link">Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to='/create' className="nav-link">Agregar</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to='/show' className="nav-link">Lista</Link>
                        </Nav.Item>
                    </Nav>
                </NavbarBs.Collapse>
            </Container>
        </NavbarBs>
    );
}

export default Navbar;
