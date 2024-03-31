/*import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import api from '../../config/configApi';

export const ViewEvento = (props) =>{

    const [status, setStatus] = useState ({
        type: '',
        mensagem:''
    })

    const [data, setData] = useState('');

    const [id] = useState(props.match.params.id)

    useEffect(() =>{
        const getEvento = async () =>{
            await api.get("/evento/evento/"+ id)
            .then((response) =>{
                if (response.data.evento){
                    console.log(response.data)
                    setData(response.data.evento)
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Evento não encontrado"
                    });
                }
            }).catch((err) =>{
                if(err.response){
                    setStatus({
                        type: 'error',
                        mensagem : err.response.data.mensagem
                    });
                }else{
                    setStatus({
                        type: 'error',
                        mensagem : "Erro, tente mais tarde!"
                    });
                }
            })
        }
        getEvento();

    },[id])
    
    return(
        <div>

            {status.type === 'error' ? <Redirect to={{
                pathname: '/',
                state: {
                    type: status.type,
                    mensagem: status.mensagem
                    }
            }}/> : ""}

            {status.type === 'success' ? <p>{status.mensagem} </p> : ""}

            <Link to={"/"}>Dashboard</Link>
            <h1>Detalhes do Evento</h1>
            <span>Status: {data.status_evento}</span><br />
            <span>Cidade: {data.cidade_evento}</span><br />
            <span>Ponto: {data.ponto_evento}</span><br />
            <span>Energia: {data.energia_evento}</span><br />
            <span>Endereço: {data.endereco_evento}</span><br />
            <span>Afetamento: {data.afeta_evento}</span><br />
            <span>Data: {moment(data.data_evento).format("DD/MM/YYYY HH:mm")}</span><br />
            <span>Protocolo: {data.protocolo_evento}</span><br />
            <span>Previsão: {moment(data.previsao_evento).format("DD/MM/YYYY HH:mm")}</span><br />

            <Link to={"/edit-evento/" + data.id_evento}><button type="button">Editar</button></Link>
        </div>
    )
}*/