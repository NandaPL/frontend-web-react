//Importa informação do react
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const itens = [
  {
    nome: "Butter",
    imagem: "/assets/butter.jpg",
  },

  {
    nome: "Map of Soul: 7",
    imagem: "/assets/map-of-the-soul-7.jpg",
  },

  {
    nome: "Map of Soul: PERSONA",
    imagem: "/assets/persona.jpg",
  },

  {
    nome: "Love Yourself: Tear",
    imagem: "/assets/Tear.jpg",
  },

  {
    nome: "Dynamite",
    imagem: "/assets/dynamite.jpg",
  },

  {
    nome: "Wings",
    imagem: "/assets/wings.jpg",
  },
];

//Criando função para chamada como componente dentro do .render
function App() {
  return <ListarItens />;
}

//{} -> dentro do java script
function ListarItens() {
  return (
    <div className="lista_itens">
      {itens.map((item) => (
        <CardItem item={item} />
      ))}
    </div>
  );
}

//Ao se passar informações aos componentes pro react isso entra como propriedade
function CardItem(props) {
  return (
    <div className="card_item">
      <h2>{props.item.nome}</h2>
      <img src={props.item.imagem} alt="imagem_album" width="300" />
    </div>
  );
}

ReactDOM.render(
  //A aplicação roda no modo estrito e ajuda apontando possiveis erros
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") //insere o elemento dentro da div do html para exibição
);
