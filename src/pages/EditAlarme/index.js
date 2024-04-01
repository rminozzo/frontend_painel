import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import api from '../../config/configApi';
import { Container } from '../../styles/custom'
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import "../../styles/forms/index.css"
import Input from '../../components/InputMask';

export const EditAlarme = (props) => {

    const [state, setState] = useState({
        type: '',
        mensagem: ''
    })

    //const [data, setData] = useState('');

    const editAlarme = async e => {
        e.preventDefault();

        await api.put("/alarme/editalarme", {
            id, cidade, ip_switch, interface_switch, status,
            data_alarme, observacao
        })

            .then((response) => {
                setState({
                    type: 'success',
                    mensagem: response.data.mensagem
                });

            }).catch((err) => {
                if (err.response) {
                    setState({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setState({
                        type: 'error',
                        mensagem: "Erro, tente mais tarde!"
                    });
                }
            }
            )
    }


    const [cidade, setCidade] = useState('');
    const [status, setStatus] = useState('');
    const [interface_switch, setInterface_switch] = useState('');
    const [ip_switch, setIp_switch] = useState('');
    const [data_alarme, setData_alarme] = useState('');
    const [observacao, setObservacao] = useState('');

    const [id] = useState(props.match.params.id)
    console.log(id)

    useEffect(() => {
        const getAlarme = async () => {
            await api.get("/alarme/alarme/" + id)
                .then((response) => {
                    if (response.data.alarme) {
                        setCidade(response.data.alarme.cidade);
                        setStatus(response.data.alarme.status);
                        setInterface_switch(response.data.alarme.interface_switch);
                        setIp_switch(response.data.alarme.ip_switch);
                        setData_alarme(response.data.alarme.data_alarme);
                        setObservacao(response.data.alarme.observacao);

                    } else {
                        setStatus({
                            type: 'warning',
                            mensagem: "Erro: Alarme não encontrado"
                        });
                    }
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'warning',
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: 'warning',
                            mensagem: "Erro, tente mais tarde!"
                        });
                    }
                })
        }
        getAlarme();

    }, [id])

    return (
        <>
            <Header />
            <Container>
                <div class="topo">
                <h1><b>Editar Alarme</b></h1>

                </div>

                {state.type === 'error' ? <Alert variant="danger">{state.mensagem}</Alert> : ""}
                {state.type === 'success' ?
                    <Redirect to={{
                        pathname: '/',
                        state: {
                            type: "success",
                            mensagem: state.mensagem
                        }
                    }} />

                    : ""}
                <div class="container-form">
                    <Form className="form-default" onSubmit={editAlarme}>

                        <Row className="g-2">
                            <Col xs="4">
                                <Form.Label>Status Alarme: </Form.Label>
                                <Form.Select name="status" value={status} onChange={e => setStatus(e.target.value)} className="mb-1">
                                    <option>Selecione</option>
                                    <option value="Em Analise">Em Analise</option>
                                    <option value="Resolvido">Resolvido</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Form.Group className="mb-2" >
                            <Form.Label >IP Switch: </Form.Label>
                            <Form.Control type="text" name="ip_switch" placeholder="IP Switch" value={ip_switch} onChange={text => setIp_switch(text.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2" >
                            <Form.Label >Interface: </Form.Label>
                            <Form.Control type="text" name="interface_switch" placeholder="Interface" value={interface_switch} onChange={text => setInterface_switch(text.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label >Cidade:</Form.Label>
                            <Form.Control type="text" name="cidade" placeholder="Cidade" value={cidade} onChange={text => setCidade(text.target.value)} required />
                        </Form.Group>


                        <Row className="g-2">
                            <Col>
                                <Form.Group className="mb-2" >
                                    <Form.Label >Datao: </Form.Label>
                                    <Input name="data_alarme" mask="99/99/9999" value={data_alarme} onChange={text => setData_alarme(text.target.value)}  required />
                                </Form.Group>
                            </Col>
                            
                        </Row>

                        <Form.Group className="mb-2">
                            <Form.Label >Observação: </Form.Label>
                            <Form.Control as="textarea" rows={3} name="observacao" value={observacao} placeholder="Observação" onChange={text => setObservacao(text.target.value)}/>
                        </Form.Group>
                        <Button variant='success' type="submit">Salvar</Button>{" "}{" "}
                        <Link to={"/"}><Button>Voltar</Button></Link>
                    </Form>
                </div>

            </Container>
        </>
    )
}