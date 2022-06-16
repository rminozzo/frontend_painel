import React, { useEffect, useState } from 'react';
//import moment from 'moment';
import api from '../../config/configApi';
import { Container } from '../../styles/custom'
import '../../index.css'
import { Table, Button, Modal, Alert, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { faAlignCenter, faEdit, faEye, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const Dashboard = () => {

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [data2, setData2] = useState('');
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [page, setPage] = useState("");
    const [lastPage, setLastpage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [idDelete, setIdDelete] = useState('');

    ///////ABRE MODAL///////
    const handleShow = (idEvento) => {
        setShow(true);
        setIdDelete(idEvento);
    }

    const choose = (option) => {
        if (option === true) {
            deleteEvento(idDelete);

        } else {
            handleClose();
        }
    }

    ///////LISTAR TODOS OS EVENTOS///////

    const getEventos = async (page) => {

        if (page === undefined) {
            page = 1;
        }

        setPage(page);

        await api.get("/evento/listar-todos/" + page)

            .then((response) => {
                console.log(response.data);
                setData(response.data.listar_todos)
                setLastpage(response.data.lastPage)

            }).catch((err) => {

                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            })
    }

    ///////EXIBE DETALHES DO EVENTO///////

    const getEvento = async (idEvento) => {

        await api.get("/evento/evento/" + idEvento)
            .then((response) => {
                if (response.data.evento) {
                    console.log(response.data)
                    setData2(response.data.evento)
                    handleShow2();
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Evento não encontrado"
                    });
                }
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
            })
    }

    ///////DELETE EVENTO/////////

    const deleteEvento = async (idDelete) => {

        console.log(idDelete)

        await api.delete("/evento/evento/" + idDelete)

            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                });
                getEventos();
                handleClose();

            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem

                    });

                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro, tente novamente"

                    });

                }
            })
    }


    useEffect(() => {
        getEventos();
    }, []);



    return (

        <>
            <Header />

            <Container>

                <Link to={"/add-evento/"}><Button variant="success" to="/add-evento" ><FontAwesomeIcon icon={faPlusSquare} /> Cadastrar Evento</Button><br /></Link>
                <hr></hr>

                <h1>Dashboard</h1>

                {status.type === 'error' ? <Alert variant="danger">{status.mensagem}</Alert> : ""}
                {status.type === 'success' ? <Alert variant="success">{status.mensagem}</Alert> : ""}


                <Table
                    bordered size="sm" variant="dark" >
                    <thead>
                        <tr>
                            <th>Cidade</th>
                            <th>Status</th>
                            <th>Hora Evento</th>
                            <th>Previsão</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.map(listar_todos => (
                            <tr key={listar_todos.id_evento}>

                                <td>{listar_todos.cidade_evento}</td>
                                <td style={{ background: listar_todos.status_evento === 'Ativo' ? '#cd2f33' : listar_todos.status_evento === 'Resolvido' ? '#56b85c' : '#999' }}>{listar_todos.status_evento}
                                    {/*<span className='badge' style={{background: listar_todos.status_evento === 'Ativo' ? '#FF0000' : listar_todos.status_evento === 'Resolvido' ? '#56b85c' : '#999'}}>
                                {listar_todos.status_evento}
                            </span>*/}
                                </td>
                                <td>{listar_todos.data_evento}</td>
                                <td>{listar_todos.previsao_evento}</td>

                                <td>
                                    {/*<Link to={"/view-evento/" + listar_todos.id_evento}>*/}<Button variant="primary" type="button" onClick={() => getEvento(listar_todos.id_evento)}  ><FontAwesomeIcon icon={faEye} /> Ver Detalhes</Button>{" "}
                                    <Link to={"/edit-evento/" + listar_todos.id_evento}><Button variant="warning" type="button" ><FontAwesomeIcon icon={faEdit} /> Editar</Button></Link>{" "}
                                    <Button variant="danger" type="button" onClick={() => handleShow(listar_todos.id_evento)}  ><FontAwesomeIcon icon={faTrashAlt} /> Apagar</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
                <ButtonToolbar aria-label="Toolbar with button groups" style={faAlignCenter}>
                    <ButtonGroup className="me-2" aria-label="First group">
                        {page !== 1 ? <Button type="button" onClick={() => getEventos(1)}>Primeira</Button> : <Button type="button" disabled>Primeira</Button>}{" "}

                        {page !== 1 ? <Button type="button" onClick={() => getEventos(page - 1)}>{page - 1}</Button> : ""}{" "}

                        <Button type="button" disabled>{page}</Button>{" "}

                        {page + 1 <= lastPage ? <Button type="button" onClick={() => getEventos(page + 1)}>{page + 1}</Button> : " "} {" "}

                        {page !== lastPage ? <Button type="button" onClick={() => getEventos(lastPage)}>Ultima</Button> : <Button type="button" disabled>Ultima</Button>}{" "}

                    </ButtonGroup>
                </ButtonToolbar>

            </Container>
            <Footer />


            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Apagar Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você realmente deseja apagar o evento?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="danger" id="sim" type="button" onClick={() => choose(true)} > Confirmar </Button>
                </Modal.Footer>
            </Modal>


            {

                ////////////////////////////////// MODAL DETALHES EVENTO /////////////////////////////////

            }

            <Modal show={show2} onHide={handleClose2} >
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span><b>Status:</b> {data2.status_evento}</span><br />
                    <span><b>Cidade:</b> {data2.cidade_evento}</span><br />
                    <span><b>Ponto:</b> {data2.ponto_evento}</span><br />
                    <span><b>Energia:</b> {data2.energia_evento}</span><br />
                    <span><b>Endereço:</b> {data2.endereco_evento}</span><br />
                    <span><b>Afeta:</b> {data2.afeta_evento}</span><br />
                    <span><b>Data:</b> {data2.data_evento}</span><br />
                    <span><b>Protocolo:</b> {data2.protocolo_evento}</span><br />
                    <span><b>Previsão:</b> {data2.previsao_evento}</span><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="button" onClick={handleClose2}> Fechar </Button>
                </Modal.Footer>
            </Modal>

        </>

    )
}