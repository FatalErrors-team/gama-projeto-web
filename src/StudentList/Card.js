import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert";
import "./style.css";

function Card({ estudante, funcaoAtualizar, setEstudantes }) {
  const [hidden, setHidden] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const history = useHistory();

  const toogleDescription = (e) => {
    e.preventDefault();
    if (hidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  function capitalize(string) {
    return `${string[0].toUpperCase()}${string
      .substr(1, string.length)
      .toLowerCase()}`;
  }

  async function deletar(e) {
    e.preventDefault();
    let id;
    if (estudante._id) {
      id = estudante._id;
    } else {
      id = estudante.id;
    }
    const response = await axios({
      method: "DELETE",
      url: "https://gama-alunos-node.herokuapp.com/api/v1/alunos/" + id,
      headers: {
        Authorization: localStorage.getItem("token"),
        "X-Persistence-Type": localStorage.getItem("data"),
      },
    });
    if (response.status === 204) {
      funcaoAtualizar(setEstudantes);
      setAlerts([...alerts, { texto: "Aluno apagado!", tempo: 2000 }]);
    }
  }

  return (
    <>
      {alerts.map((alert) => {
        return <Alert texto={alert.texto} tempo={alert.tempo} />;
      })}
      <div className="card-main-description">
        <div>{estudante.nome}</div>
        <div>{estudante.curso.nome}</div>
        <div>{capitalize(estudante.conceito)}</div>
        <div>
          <button className="card-btn" onClick={toogleDescription}>
            {hidden ? "Mostrar Menos" : "Mostrar Mais"}
          </button>
        </div>
      </div>
      {hidden ? (
        <div className="complementar__container">
          <div className="complementar-description">
            <div className="complementar-description-row">
              <h3>Nota Prova 1</h3>
              <h3>{estudante.nota01}</h3>
            </div>
            <div className="complementar-description-row">
              <h3>Nota Prova 2</h3>
              <h3>{estudante.nota02}</h3>
            </div>
            <div className="complementar-description-row">
              <h3>Nota da Apresentaçao</h3>
              <h3>{estudante.notaApresentacao}</h3>
            </div>
            <div className="complementar-description-row">
              <h3>Nota do Trabalho</h3>
              <h3>{estudante.notaTrabalho}</h3>
            </div>
            <div className="total-text">
              <h3>TOTAL</h3>
              <h3>{estudante.media}</h3>
            </div>
            <div className="actions">
              <div>
                <button className="btn btn-exclude" onClick={deletar}>
                  Excluir
                </button>
                <button
                  className="btn btn-update"
                  onClick={() => {
                    let id;
                    if (estudante._id) {
                      id = estudante._id;
                    } else {
                      id = estudante.id;
                    }
                    history.push(
                      "/atualizar-aluno/" + id.toString() + "#title"
                    );
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default Card;
