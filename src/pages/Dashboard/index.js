import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../../config/configApi';
import {Container } from '../../styles/custom'
import '../../index.css'
import { Table, Button, Modal} from 'react-bootstrap';
import { faEdit, faEye, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  Header  from '../../components/Header';

export const Dashboard = () => {

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const getEvento = async () => {
        await api.get("/evento/listar-todos")

            .then((response) => {
                console.log(response.data);
                setData(response.data.listar_todos)
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

    useEffect(() => {
        getEvento();


    }, []);

    const deleteEvento = async (idEvento) => {

        await api.delete("/evento/evento/" + idEvento)
            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                });
                getEvento();
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


    return (
        
        <>
        <Header/>
        
        <Container>
        
            <Link to={"/add-evento/"}><Button variant="success" to="/add-evento" ><FontAwesomeIcon icon={faPlusSquare} /> Cadastrar Evento</Button><br /></Link>
            <hr></hr>

            <h1>Dashboard</h1>

            {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}


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
                            <td style={{ background: listar_todos.status_evento === 'Ativo' ? '#FF0000' : listar_todos.status_evento === 'Resolvido' ? '#56b85c' : '#999' }}>{listar_todos.status_evento}
                                {/*<span className='badge' style={{background: listar_todos.status_evento === 'Ativo' ? '#FF0000' : listar_todos.status_evento === 'Resolvido' ? '#56b85c' : '#999'}}>
                                {listar_todos.status_evento}
                            </span>*/}
                            </td>
                            <td>{moment(listar_todos.data_evento).format("DD/MM/YYYY HH:mm")}</td>
                            <td>{moment(listar_todos.previsao_evento).format("DD/MM/YYYY HH:mm")}</td>

                            <td>
                                <Link to={"/view-evento/" + listar_todos.id_evento}><Button variant="primary" type="button" ><FontAwesomeIcon icon={faEye} /> Ver Detalhes</Button></Link>{" "}
                                <Link to={"/edit-evento/" + listar_todos.id_evento}><Button variant="warning" type="button" ><FontAwesomeIcon icon={faEdit} /> Editar</Button></Link>{" "}
                                <Button variant="danger" type="button" onClick={handleShow} ><FontAwesomeIcon icon={faTrashAlt} /> Apagar</Button>

                                <Modal show={show} onHide={handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Apagar Evento</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você realmente deseja apagar o Evento?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancelar
                                        </Button>
                                        <Button variant="danger" type="button" onClick={() => deleteEvento(listar_todos.id_evento)}>
                                            Confirmar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </Table>

            </Container>
            


        </>

        
    )
}