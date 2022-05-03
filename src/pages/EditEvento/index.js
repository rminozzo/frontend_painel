import React, { useEffect, useState } from "react";

import { Link,Redirect } from 'react-router-dom';
import api from '../../config/configApi';

export const EditEvento = (props) => {

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    //const [data, setData] = useState('');

    const editUser = async e => {
        e.preventDefault();

        await api.put("/evento/evento", {id_evento, cidade_evento, status_evento, 
                                    endereco_evento, ponto_evento, energia_evento,
                                    afeta_evento, data_evento, protocolo_evento, previsao_evento})
        
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
    )}
    

    const [cidade_evento, setCidade_evento] = useState ('');    
    const [status_evento, setStatus_evento] = useState ('');
    const [endereco_evento, setEndereco_evento] = useState ('');
    const [ponto_evento, setPonto_evento] = useState ('');
    const [energia_evento, setEnergia_evento] = useState ('');
    const [afeta_evento, setAfeta_evento] = useState ('');
    const [data_evento, setData_evento] = useState ('');
    const [protocolo_evento, setProtocolo_evento] = useState ('');
    const [previsao_evento, setPrevisao_evento] = useState ('');

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
        <div>

            {status.type === 'warning' ? 
            <Redirect to={{
                pathname: '/',
                state: {
                    type: "error",
                    mensagem: status.mensagem
                }
            }} /> : ""}

            {status.type === 'success' ? <Redirect to={{
                pathname: '/',
                state: {
                    type: "success",
                    mensagem: status.mensagem
                }
            }} /> : ""}
            {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}

            <Link to={"/"}>Dashboard</Link>
            <h1>Editar Evento </h1>

            <form onSubmit={editUser}>
                <label>Status Evento: </label>
                <select name="status_evento" onChange={e => setStatus_evento(e.target.value)}>
                    <option>Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Resolvido">Resolvido</option>
                    <option value="Sem Info">Sem Info</option>
                </select><br /><br />

                <label>Cidade: </label>
                <input type="text" name="cidade_evento" placeholder="Cidade" value={cidade_evento} onChange={text => setCidade_evento(text.target.value)} /><br /><br />

                <label>Ponto: </label>
                <input type="text" name="ponto_evento" placeholder="Ponto" value={ponto_evento} onChange={text => setPonto_evento(text.target.value)} /><br /><br />

                <label>Energia: </label>
                <input type="text" name="energia_evento" placeholder="Evento" value={energia_evento} onChange={text => setEnergia_evento(text.target.value)} /><br /><br />

                <label>Endereço: </label>
                <input type="text" name="endereco_evento" placeholder="Endereço" value={endereco_evento} onChange={text => setEndereco_evento(text.target.value)} /><br /><br />

                <label>Afetamento: </label>
                <input type="text" name="afeta_evento" placeholder="Afetamento" value={afeta_evento} onChange={text => setAfeta_evento(text.target.value)}/><br /><br />

                <label>Data do Evento: </label>
                <input type="text" name="data_evento" placeholder="Data" value={data_evento} onChange={text => setData_evento(text.target.value)} /><br /><br />

                <label>Protocolo: </label>
                <input type="text" name="protocolo_evento" placeholder="Protocolo" value={protocolo_evento} onChange={text => setProtocolo_evento(text.target.value)} /><br /><br />

                <label>Previsao: </label>
                <input type="datetime-local" name="previsao_evento" placeholder="Previsão" value={previsao_evento} onChange={text => setPrevisao_evento(text.target.value)} /><br /><br />


                <button type="submit">Editar</button>
            </form>
        </div>
    )
}