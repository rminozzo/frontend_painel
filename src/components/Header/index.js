import React from "react";

import { Navbar} from 'react-bootstrap'
import {Container } from '../../styles/custom'

 function Header(){
     return(
        <Navbar bg="dark" >
            <Container>
            <Navbar.Brand href="/">
                <img
                src="/images/adyltelecom-branco.png"
                width="82"
                height="50"
                
                className="d-inline-block align-top "
                alt="logo"
                />
            </Navbar.Brand>
            </Container>
        </Navbar>
     );
 }

 export default Header;