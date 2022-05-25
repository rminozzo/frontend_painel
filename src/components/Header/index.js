import React from "react";

import { Navbar} from 'react-bootstrap'
import {Container } from '../../styles/custom'

 function Header(){
     return(
        <Navbar bg="dark" >
            <Container>
            <Navbar.Brand href="#home">
                <img
                src="/images/adyltelecom-branco.png"
                width="95"
                height="55"
                
                className="d-inline-block align-top "
                alt="logo"
                />
            </Navbar.Brand>
            </Container>
        </Navbar>
     );
 }

 export default Header;