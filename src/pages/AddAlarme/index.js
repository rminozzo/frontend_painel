import React, { useState } from 'react';
import api from '../../config/configApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from "react-router-dom";
import { Container } from '../../styles/custom'
//import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import Input from '../../components/InputMask';
//import MaskedFormControl from 'react-bootstrap-maskedinput'
//import InputMask from "react-input-mask";
//import Footer from '../../components/Footer';
import "../../styles/forms/index.css"

export const AddAlarme = () => {

    //const [datamask, setDatamask] = useState('');

    const [alarme, setAlarme] = useState({
        ip_switch: '',
        cidade: '',
        interface_switch: '',
        data_alarme: '',
        status: '',
        observacao: '',
        
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setAlarme({ ...alarme, [e.target.name]: e.target.value });

    const AddAlarme = async e => {
        e.preventDefault();


        await api.post('/alarme/addalarme', alarme)
            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente novamente!"
                    });
                }
            });


    }
    return (
        <>
            <Header />
            <Container>
                <div class="topo">
                    <h1><b>Cadastrar Alarme</b></h1>

                </div>

                {status.type === 'error' ? <Alert variant="danger">{status.mensagem}</Alert> : ""}
                {status.type === 'success' ?
                    <Redirect to={{
                        pathname: '/',
                        state: {
                            type: "success",
                            mensagem: status.mensagem
                        }
                    }} />

                    : ""}

                <div className="container-form">
                    
                    <Form className="form-default" onSubmit={AddAlarme}>

                        <Row className="g-2">
                            <Col xs="4">
                                <Form.Label >Status Alarme: </Form.Label>
                                <Form.Select name="status" onChange={valueInput} className="mb-1" required>
                                    <option>Selecione</option>
                                    <option value="Em Analise">Em Analise</option>
                                    <option value="Resolvido">Resolvido</option>
                                </Form.Select>
                            </Col>
                        </Row>
                       
                        <Form.Group className="mb-2" >
                            <Form.Label >IP Switch: </Form.Label>
                            <Input type="text" name="ip_switch" placeholder="IP Switch" onChange={valueInput} required />
                        </Form.Group>

                        <Form.Group className="mb-2" >
                            <Form.Label >Interface: </Form.Label>
                            <Form.Control  type="text"  name="interface_switch" placeholder="Interface" onChange={valueInput} required />
                        </Form.Group>

                        <Form.Group className="mb-2" >
                            <Form.Label>Cidade:</Form.Label>
                            <Form.Control type="text" name="cidade" placeholder="Cidade Switch" onChange={valueInput} required />
                        </Form.Group>

                        <Row className="g-2">
                            <Col>
                                <Form.Group className="mb-2" >
                                    <Form.Label >Data Alarme: </Form.Label>
                                    
                                    <Input name="data_alarme" mask="99/99/9999" value={alarme.data_alarme} onChange={valueInput} required/>
                                    
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-2">
                            <Form.Label >Observação: </Form.Label>
                            <Form.Control as="textarea" rows={3} name="observacao" placeholder="Observação" onChange={valueInput}/>
                        </Form.Group>
                     
                        
                        <Button variant='success' type="submit">Cadastrar</Button>{" "}{" "}
                        <Link to={"/"}><Button>Voltar</Button></Link>
                        
                    </Form>
                </div>
                
               
            </Container>

            
            
        </>

    );
}
