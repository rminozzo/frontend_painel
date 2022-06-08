import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import api from '../../config/configApi';
import { Container } from '../../styles/custom'
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import "../../styles/forms/index.css"

export const EditEvento = (props) => {

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    //const [data, setData] = useState('');



    const editUser = async e => {
        e.preventDefault();

        await api.put("/evento/evento", {
            id_evento, cidade_evento, status_evento,
            endereco_evento, ponto_evento, energia_evento,
            afeta_evento, data_evento, protocolo_evento, previsao_evento
        })

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
                        mensagem: "Erro, tente mais tarde!"
                    });
                }
            }
            )
    }


    const [cidade_evento, setCidade_evento] = useState('');
    const [status_evento, setStatus_evento] = useState('');
    const [endereco_evento, setEndereco_evento] = useState('');
    const [ponto_evento, setPonto_evento] = useState('');
    const [energia_evento, setEnergia_evento] = useState('');
    const [afeta_evento, setAfeta_evento] = useState('');
    const [data_evento, setData_evento] = useState('');
    const [protocolo_evento, setProtocolo_evento] = useState('');
    const [previsao_evento, setPrevisao_evento] = useState('');

    const [id_evento] = useState(props.match.params.id_evento)
    console.log(id_evento)

    useEffect(() => {
        const getEvento = async () => {
            await api.get("/evento/evento/" + id_evento)
                .then((response) => {
                    if (response.data.evento) {
                        setCidade_evento(response.data.evento.cidade_evento);
                        setStatus_evento(response.data.evento.status_evento);
                        setEndereco_evento(response.data.evento.endereco_evento);
                        setPonto_evento(response.data.evento.ponto_evento);
                        setEnergia_evento(response.data.evento.energia_evento);
                        setAfeta_evento(response.data.evento.afeta_evento);
                        setData_evento(response.data.evento.data_evento);
                        setProtocolo_evento(response.data.evento.protocolo_evento);
                        setPrevisao_evento(response.data.evento.previsao_evento);

                    } else {
                        setStatus({
                            type: 'warning',
                            mensagem: "Erro: Evento não encontrado"
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
        getEvento();

    }, [id_evento])

    return (
        <>
            <Header />
            <Container>
                <div class="topo">
                <h1><b>Editar Evento</b></h1>

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
                <div class="container-form">
                    <Form className="form-default" onSubmit={editUser}>

                        <Row className="g-2">
                            <Col xs="4">
                                <Form.Label>Status Evento: </Form.Label>
                                <Form.Select name="status_evento" value={status_evento} onChange={e => setStatus_evento(e.target.value)} className="mb-1">
                                    <option>Selecione</option>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Resolvido">Resolvido</option>
                                    <option value="Sem Info">Sem Info</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Form.Group className="mb-2">
                            <Form.Label >Cidade:</Form.Label>
                            <Form.Control type="text" name="cidade_evento" placeholder="Cidade Evento" value={cidade_evento} onChange={text => setCidade_evento(text.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2" >
                            <Form.Label >Ponto: </Form.Label>
                            <Form.Control type="text" name="ponto_evento" placeholder="Ponto" value={ponto_evento} onChange={text => setPonto_evento(text.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2" >
                            <Form.Label >Energia: </Form.Label>
                            <Form.Control type="text" name="energia_evento" placeholder="Evento" value={energia_evento} onChange={text => setEnergia_evento(text.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2" >
                            <Form.Label>Endereço: </Form.Label>
                            <Form.Control type="text" name="endereco_evento" placeholder="Rua Brasil, 595, Centro" value={endereco_evento} onChange={text => setEndereco_evento(text.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2" >
                            <Form.Label >Clientes afetados: </Form.Label>
                            <Form.Control type="text" name="afeta_evento" placeholder="30 clientes" value={afeta_evento} onChange={text => setAfeta_evento(text.target.value)} required />
                        </Form.Group>

                        <Row className="g-2">
                            <Col>
                                <Form.Group className="mb-2" >
                                    <Form.Label >Data do Evento: </Form.Label>
                                    <Form.Control name="data_evento" type="text" placeholder="Data" value={moment(data_evento).format("DD/MM/YYYY HH:mm")} onChange={text => setData_evento(text.target.value)} disabled required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label >Previsao: </Form.Label>
                                    <Form.Control name="previsao_evento" type="text" placeholder="Previsão" value={moment(previsao_evento).format("DD/MM/YYYY HH:mm")} onChange={text => setPrevisao_evento(text.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-2">
                            <Form.Label >Protocolo: </Form.Label>
                            <Form.Control type="text" name="protocolo_evento" placeholder="Protocolo" value={protocolo_evento} onChange={text => setProtocolo_evento(text.target.value)} required />
                        </Form.Group>
                        <Button variant='success' type="submit">Salvar</Button>{" "}{" "}
                        <Link to={"/"}><Button>Voltar</Button></Link>
                    </Form>
                </div>

            </Container>
        </>
    )
}