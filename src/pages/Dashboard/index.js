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
    const handleShow = (idAlarme) => {
        setShow(true);
        setIdDelete(idAlarme);
    }

    const choose = (option) => {
        if (option === true) {
            deleteAlarme(idDelete);

        } else {
            handleClose();
        }
    }

    ///////LISTAR TODOS OS Alarmes///////

    const getAlarmes = async (page) => {

        if (page === undefined) {
            page = 1;
        }

        setPage(page);

        await api.get("/alarme/listar-todos/" + page)

            .then((response) => {
                //console.log(response.data);
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

    ///////EXIBE DETALHES DO Alarme///////

    const getAlarme = async (id) => {

        await api.get("/alarme/alarme/" + id)
            .then((response) => {
                if (response.data.alarme) {
                    //console.log(response.data)
                    setData2(response.data.alarme)
                    handleShow2();
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Alarme não encontrado"
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

    ///////DELETE Alarme/////////

    const deleteAlarme = async (id) => {

        await api.delete("/alarme/delalarme/" + id)

            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                });
                getAlarmes();
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
        getAlarmes();
    }, []);



    return (

        <>
            <Header />

            <Container>

                <Link to={"/add-alarme/"}><Button variant="success" to="/add-alarme" ><FontAwesomeIcon icon={faPlusSquare} /> Cadastrar Alarme</Button><br /></Link>
                <hr></hr>

                <h1>Dashboard</h1>

                {status.type === 'error' ? <Alert variant="danger">{status.mensagem}</Alert> : ""}
                {status.type === 'success' ? <Alert variant="success">{status.mensagem}</Alert> : ""}


                <Table
                    bordered size="sm" variant="dark" >
                    <thead>
                        <tr>
                            <th>Cidade</th>
                            <th>IP Switch</th>
                            <th>Interface</th>
                            <th>Status</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.map(listar_todos => (
                            <tr key={listar_todos.id}>

                                <td>{listar_todos.cidade}</td>
                                <td>{listar_todos.ip_switch}</td>
                                <td>{listar_todos.interface_switch}</td>
                                <td style={{ background: listar_todos.status === 'Em Analise' ? '#cd2f33' : listar_todos.status === 'Resolvido' ? '#56b85c' : '#999' }}>{listar_todos.status}
                                  
                                </td>
                                <td>{listar_todos.data_alarme}</td>
                                

                                <td>
                                    <Button variant="primary" type="button" onClick={() => getAlarme(listar_todos.id)}  ><FontAwesomeIcon icon={faEye} /> Ver Detalhes</Button>{" "}
                                    <Link to={"/edit-alarme/" + listar_todos.id}><Button variant="warning" type="button" ><FontAwesomeIcon icon={faEdit} /> Editar</Button></Link>{" "}
                                    <Button variant="danger" type="button" onClick={() => handleShow(listar_todos.id)}  ><FontAwesomeIcon icon={faTrashAlt} /> Apagar</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
                <ButtonToolbar aria-label="Toolbar with button groups" style={faAlignCenter}>
                    <ButtonGroup className="me-2" aria-label="First group">
                        {page !== 1 ? <Button type="button" onClick={() => getAlarmes(1)}>Primeira</Button> : <Button type="button" disabled>Primeira</Button>}{" "}

                        {page !== 1 ? <Button type="button" onClick={() => getAlarmes(page - 1)}>{page - 1}</Button> : ""}{" "}

                        <Button type="button" disabled>{page}</Button>{" "}

                        {page + 1 <= lastPage ? <Button type="button" onClick={() => getAlarmes(page + 1)}>{page + 1}</Button> : " "} {" "}

                        {page !== lastPage ? <Button type="button" onClick={() => getAlarmes(lastPage)}>Ultima</Button> : <Button type="button" disabled>Ultima</Button>}{" "}

                    </ButtonGroup>
                </ButtonToolbar>

            </Container>
            <Footer />


            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Apagar Alarme</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você realmente deseja apagar o Alarme?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="danger" id="sim" type="button" onClick={() => choose(true)} > Confirmar </Button>
                </Modal.Footer>
            </Modal>


            {

                ////////////////////////////////// MODAL DETALHES Alarme /////////////////////////////////

            }

            <Modal show={show2} onHide={handleClose2} >
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do Alarme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span><b>Status:</b> {data2.status}</span><br />
                    <span><b>Cidade:</b> {data2.cidade}</span><br />
                    <span><b>IP Switch:</b> {data2.ip_switch}</span><br />
                    <span><b>Interface:</b> {data2.interface_switch}</span><br />
                    <span><b>Data:</b> {data2.data_alarme}</span><br />
                    <span><b>Obesarvação:</b> {data2.observacao}</span><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="button" onClick={handleClose2}> Fechar </Button>
                </Modal.Footer>
            </Modal>

        </>

    )
}