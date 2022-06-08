import React from "react";

import { Navbar, Container } from 'react-bootstrap'
//import { Container } from '../../styles/custom'

function Header() {
    return (
        <Navbar bg="dark" class="sm" >
            
                <Navbar.Brand href="/">
                    <img
                        src="/images/adyltelecom-branco.png"
                        width="82"
                        height="50"

                        className="d-inline-block align-top m-30"
                        alt="logo"
                    />
                </Navbar.Brand>
            


        </Navbar>
    );
}

export default Header;