import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../../config/configApi';
import Table from 'react-bootstrap/Table';

import { Link, useLocation } from 'react-router-dom';

export const Dashboard = () => {

    const { state } = useLocation();

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });


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

    const deleteEvento = async (idEvento) =>{

        await api.delete("/evento/evento/" + idEvento)
        .then((response) =>{
            setStatus({
                type: 'success',
                mensagem: response.data.mensagem
            });
            getEvento();

        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem

                });

            }else{
                setStatus({
                    type: 'error',
                    mensagem: "Erro, tente novamente"

                });

            }
        })
    }


    return (
        <>
            <Link to="/add-evento">Cadastrar Evento</Link><br />

            <h1>Dashboard</h1>

            {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p style={{color: "green"}}>{status.mensagem}</p> : ""}


            <Table  striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>Cidade</th>
                        <th>Hora Evento</th>
                        <th>Previsão</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map(listar_todos => (
                        <tr key={listar_todos.id_evento}>
                            
                            <td>{listar_todos.cidade_evento}</td>
                            <td>{moment(listar_todos.data_evento).format("DD/MM/YYYY HH:mm")}</td>
                            <td>{moment(listar_todos.previsao_evento).format("DD/MM/YYYY HH:mm")}</td>
                            <td>{listar_todos.status_evento}</td>
                            <td>
                                <Link to={"/view-evento/" + listar_todos.id_evento}><button type="button">Visualizar</button></Link> {" "}
                                <Link to={"/edit-evento/" + listar_todos.id_evento}><button type="button">Editar</button></Link>
                                <Link to={"#"}><button type="button" onClick={() => deleteEvento(listar_todos.id_evento)}>Apagar</button></Link>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </Table>



        </>
    )
}