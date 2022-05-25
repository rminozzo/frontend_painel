import React, { useState } from 'react';
import api from '../../config/configApi';

import { Link, Redirect } from "react-router-dom";
import {Container } from '../../styles/custom'

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
        <Container>
            <Link to="/">Voltar</Link>
            <h1>Cadastrar Eventos</h1>

            {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}
            {status.type === 'success' ?
                <Redirect to={{
                    pathname: '/',
                    state: {
                        type: "success",
                        mensagem: status.mensagem
                    }
                }} />

                : ""}

            <form onSubmit={addEvento}>
                <label>Status Evento: </label>
                <select name="status_evento" onChange={valueInput}>
                    <option>Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Resolvido">Resolvido</option>
                    <option value="Sem Info">Sem Info</option>
                </select><br /><br />

                <label>Cidade: </label>
                <input type="text" name="cidade_evento" placeholder="Cidade" onChange={valueInput} /><br /><br />

                <label>Ponto: </label>
                <input type="text" name="ponto_evento" placeholder="Ponto" onChange={valueInput} /><br /><br />

                <label>Energia: </label>
                <input type="text" name="energia_evento" placeholder="Evento" onChange={valueInput} /><br /><br />

                <label>Endereço: </label>
                <input type="text" name="endereco_evento" placeholder="Endereço" onChange={valueInput} /><br /><br />

                <label>Afetamento: </label>
                <input type="text" name="afeta_evento" placeholder="Afetamento" onChange={valueInput} /><br /><br />

                <label>Data do Evento: </label>
                <input type="datetime-local" name="data_evento" placeholder="Data" onChange={valueInput} /><br /><br />

                <label>Protocolo: </label>
                <input type="text" name="protocolo_evento" placeholder="Protocolo" onChange={valueInput} /><br /><br />

                <label>Previsao: </label>
                <input type="datetime-local" name="previsao_evento" placeholder="Previsão" onChange={valueInput} /><br /><br />


                <button type="submit">Cadastrar</button>
            </form>
            </Container>

        </>

    );
}
