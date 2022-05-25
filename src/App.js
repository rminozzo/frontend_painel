import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import Routes from './routes/routesAdm';


function App() {
  return (
    <div>
     <Router>
          <Routes/>
      </Router>
    </div>
  );
}



/*import React, { useState, useEffect } from 'react';

//import Header from './components/Header';
//import Article from './components/Article';
//import Menu from './components/Menu';
//import Aside from './components/Aside';
//import Footer from './components/Footer';
//import Comment from './components/Comment';

function App() {

  const [nome, setNome] = useState("Roberto");
  const [produtoId, setProdutoId] = useState(3);
  const [produtoNome, setProdutoNome] = useState ('');
  const [data, setData] =  useState({
    nome: '',
    preco: '',

  })

  function buscarProduto(){
    console.log("Procurar produto");
    //setProdutoId(4);
    setProdutoNome("Computador");
    setData({
      nome: "Notebook",
      preco: 5000
    });
    
  }

  useEffect(() =>{
    buscarProduto();
  },[produtoId])

  return(
    <div>
     <p>{nome}</p>

     <button onClick={() =>setNome("Roberto Minozzo")}>Alterar</button><br /><br />

     <p>Listar Produto</p>
     <p>Produto: {produtoNome}</p>
      <p>Preço: {data.preco}</p>

    </div>
  )

}

  /*
  //Terceira aula, components
  const  comment = {
    date: new Date(),
    text: 'blabla blabla lalala',
    author: {
      nome: 'Roberto',
      AvatarUrl: 'https://placekitten.com/200/300'
    }
  }

  return(
    <div>
      <Header/>
      <Menu/>
      <Article/>
      <Comment 
        date={comment.date}
        text={comment.text}
        author={comment.author}
      />
      <Aside/>
      <Footer/>
    </div>
  )
}*/



//Segunda aula props e class
/*
  return(
    <div>
      <h1>Olá <Welcome name="Roberto"/></h1>
    </div>
  )
}
  //Componente utilizando function

  function Welcome(props){
    return <span>{props.name}</span>
  }*/

  //Componente utilizando Class
  /*
  class Welcome extends React.Component{
    render(){
      return <span>{this.props.name}</span>
    }
  }*/


  //Primeira aula 
  /*
  const nome = "Roberto";

  const usuario = {
    idade: 35,
    profissao: "Analista"
  }

  function formatarNome(nome){
    return nome
  }

  function formatarDados(usuario){
    return " tem " + usuario.idade + " anos, profissão " + usuario.profissao + ".";
  }

  return (
    <div>
     <h1>Colaborador, {formatarNome(nome)} {formatarDados(usuario)}</h1>
    </div>
  );
}*/

export default App;
