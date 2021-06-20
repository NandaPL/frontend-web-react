//Importa informação do react
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";

//Criando função para chamada como componente dentro do .render
//componente renderizado via rota
function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={ListarItens} />
      <Route path="/visualizar/:id" component={VisualizarItem} />
    </Switch>
  );
}

//Fazer requisição de api, carregar dados de um server, componente com + de um comportamento é uma class
class ListarItens extends React.Component {
  //1 - Define estado inicial
  //customizar construtor
  constructor(props) {
    super(props);

    //estado inicial
    this.state = {
      itens: [],
    };
  }

  //construir metodo/componente (lista de itens) por meio de requisição
  //criar 'key' para o react nao se perder e/ou perder o item
  //'async' torna a requisição assincrona
  async componentDidMount() {
    //resolvendo promise
    const request = await fetch("https://backend-flexivel.herokuapp.com/", {
      headers: new Headers({
        Authorization: "fpl.snf19",
      }),
    });

    const json = await request.json(); //extrai json da lista

    //2 - Atualiza estado
    this.setState({
      itens: json,
    });
  }
  //funcçoes em classes nao precisam de 'function. e o nome da função precisa ser algo que carregue renderize os itens dela
  //render faz com que sejam carregados os itens daquele componente
  render() {
    //3 - Renderiza utilizando a informação que esta no estado
    return (
      <div className="lista_itens">
        {this.state.itens.map((item, index) => (
          <CardItem item={item} key={index} />
        ))}
      </div>
    );
  }
}

//Ao se passar informações aos componentes pro react isso entra como propriedade
function CardItem(props) {
  return (
    <Route
      render={({ history }) => (
        <div
          className="card_item"
          onClick={() => {
            history.push("/visualizar/" + props.item._id);
          }}
        >
          <h2>{props.item.nome}</h2>
          <img src={props.item.imagem} alt={props.item.nome} width="300" />
        </div>
      )}
    />
  );
}

class VisualizarItem extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      item: {},
    };
  }

  async componentDidMount() {
    const request = await fetch(
      "https://backend-flexivel.herokuapp.com/" + this.id,
      {
        headers: new Headers({
          Authorization: "fpl.snf19",
        }),
      }
    );

    const json = await request.json();

    // 2 - Atualiza o estado
    this.setState({
      item: json,
    });
  }

  render() {
    return (
      <div className="card_item">
        <h2>{this.state.item.nome}</h2>
        <img
          src={this.state.item.imagem}
          alt={this.state.item.nome}
          width="300"
        />
        <div>{this.state.item.descricao}</div>
      </div>
    );
  }
}

ReactDOM.render(
  //A aplicação roda no modo estrito e ajuda apontando possiveis erros
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") //insere o elemento dentro da div do html para exibição
);
