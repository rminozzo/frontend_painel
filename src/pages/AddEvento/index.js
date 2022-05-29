import React, { useState } from 'react';
import api from '../../config/configApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from "react-router-dom";
import { Container } from '../../styles/custom'
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import "../../styles/forms/index.css"

export const AddEvento = () => {

    const [evento, setEvento] = useState({
        status_evento: '',
        cidade_evento: '',
        ponto_evento: '',
        energia_evento: '',
        endereco_evento: '',
        afeta_evento: '',
        data_evento: '',
        protocolo_evento: '',
        previsao_evento: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setEvento({ ...evento, [e.target.name]: e.target.value });

    const addEvento = async e => {
        e.preventDefault();


        await api.post('/evento/evento', evento)
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
                    <h1>Cadastrar Evento</h1>

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
                    <Form className="form-default" onSubmit={addEvento}>

                        <Row className="g-2">
                            <Col xs="4">
                                <Form.Label>Status Evento: </Form.Label>
                                <Form.Select name="status_evento" onChange={valueInput} className="mb-1">
                                    <option>Selecione</option>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Resolvido">Resolvido</option>
                                    <option value="Sem Info">Sem Info</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Form.Group className="mb-2" controlId="formBasicText" >
                            <Form.Label id="cidadeValidation" for="cidadeValidation">Cidade:</Form.Label>
                            <Form.Control type="text" name="cidade_evento" placeholder="Cidade Evento" onChange={valueInput} required />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label for="pontoValidation">Ponto: </Form.Label>
                            <Form.Control id="pontoValidation" type="text" name="ponto_evento" placeholder="Ponto" onChange={valueInput} required />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label for="pontoValidation">Energia: </Form.Label>
                            <Form.Control id="pontoValidation" type="text" name="energia_evento" placeholder="Evento" onChange={valueInput} required />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label for="energiaValidation">Endereço: </Form.Label>
                            <Form.Control id="energiaValidation" type="text" name="endereco_evento" placeholder="Rua Brasil, 595, Centro" onChange={valueInput} required />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label for="afetamentoValidation">Clientes afetados: </Form.Label>
                            <Form.Control id="afetamentoValidation" type="text" name="afeta_evento" placeholder="30 clientes" onChange={valueInput} required />
                        </Form.Group>

                        <Row className="g-2">
                            <Col>
                                <Form.Group className="mb-2" controlId="formBasicText">
                                    <Form.Label for="dataValidation">Data do Evento: </Form.Label>
                                    <Form.Control id="dataValidation" type="datetime-local" name="data_evento" placeholder="Data" onChange={valueInput} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label for="previsaoValidation">Previsao: </Form.Label>
                                    <Form.Control id="previsaoValidation" type="datetime-local" name="previsao_evento" placeholder="Previsão" onChange={valueInput} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label for="protocoloValidation">Protocolo: </Form.Label>
                            <Form.Control id="protocoloValidation" type="text" name="protocolo_evento" placeholder="Protocolo" onChange={valueInput} required />
                        </Form.Group>

                        <Button variant='success' type="submit">Cadastrar</Button>{" "}{" "}
                        <Link to={"/"}><Button>Voltar</Button></Link>
                    </Form>
                </div>

            </Container>

        </>

    );
}
