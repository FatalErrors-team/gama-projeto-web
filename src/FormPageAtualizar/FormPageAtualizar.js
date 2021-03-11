import { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as FormImage } from "./formImage.svg";
import { useParams, useHistory } from "react-router-dom";
import Alert from "../Alert";
import "./style.css";

function FormPage() {
  const { id } = useParams();

  const form = Object.freeze({
    id,
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    logradouro: "",
    numero: "",
    curso: "",
    disciplina: "",
    nota01: "",
    nota02: "",
    notaApresentacao: "",
    notaTrabalho: "",
  });

  const [formData, setFormData] = useState(form);
  const [alerts, setAlerts] = useState([]);
  const history = useHistory();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    function popular(setFormData) {
      console.log("https://gama-alunos-node.herokuapp.com/api/v1/alunos/" + id);
      axios({
        method: "GET",
        url: "https://gama-alunos-node.herokuapp.com/api/v1/alunos/" + id,
        headers: {
          Authorization: localStorage.getItem("token"),
          "X-Persistence-Type": localStorage.getItem("data"),
        },
      })
        .then((response) => {
          const data = response.data.data;
          if (data._id) {
            data.id = data._id;
          }
          const modelo = {
            id: data.id.toString(),
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            cep: data.endereco.cep,
            logradouro: data.endereco.logradouro,
            numero: data.endereco.numero,
            curso: data.curso.nome,
            disciplina: data.curso.disciplina,
            nota01: data.nota01,
            nota02: data.nota02,
            notaApresentacao: data.notaApresentacao,
            notaTrabalho: data.notaTrabalho,
          };
          setFormData(modelo);
        })
        .catch(() => {
          // history.push("/");
        });
    }

    popular(setFormData);
  }, [setFormData, id, history]);

  function salvar(e) {
    e.preventDefault();

    const formatedData = {
      id: formData.id.toString(),
      nome: formData.nome.trim(),
      email: formData.email.trim(),
      telefone: formData.telefone.trim(),
      endereco: {
        cep: formData.cep.trim(),
        logradouro: formData.logradouro.trim(),
        numero: formData.numero,
      },
      curso: {
        nome: formData.curso.trim(),
        disciplina: formData.disciplina.trim(),
      },
      nota01: formData.nota01,
      nota02: formData.nota02,
      notaApresentacao: formData.notaApresentacao,
      notaTrabalho: formData.notaTrabalho,
    };

    axios({
      method: "PATCH",
      url: "https://gama-alunos-node.herokuapp.com/api/v1/alunos/" + id,
      data: JSON.stringify(formatedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        "X-Persistence-Type": localStorage.getItem("data"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setAlerts([
            ...alerts,
						{ texto: "Atualizado com sucesso!", tempo: 2000, link: "/#lista-de-alunos" },
          ]);
        } else {
          setAlerts([...alerts, { texto: "Houve algum erro!", tempo: 2000 }]);
        }
      })
      .catch(() => {
        setAlerts([...alerts, { texto: "Houve algum erro!", tempo: 2000 }]);
      });
  }
  return (
    <>
      {alerts.map((alert) => {
        return (
          <Alert
            texto={alert.texto}
            tempo={alert.tempo}
            link={alert.link}
            key={alert.texto}
          />
        );
      })}
      <div className="form__container">
        <FormImage className="form-image" />
        <h3 className="form-title" id="title">
          Informe os dados do aluno
        </h3>
        <form className="form-container" onSubmit={salvar}>
          <input
            className="input-item"
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Nome"
          />
          <input
            className="input-item"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
          <input
            className="input-item"
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            placeholder="Telefone (xx) xxxxx-xxxx"
          />
          <input
            className="input-item"
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            required
            placeholder="CEP xxxxx-xxx"
          />
          <input
            className="input-item"
            type="text"
            id="logradouro"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
            required
            placeholder="Logradouro"
          />
          <input
            className="input-item"
            type="number"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            placeholder="Número"
            min="1"
          />
          <input
            className="input-item"
            type="text"
            id="curso"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            required
            placeholder="Curso"
          />
          <input
            className="input-item"
            type="text"
            id="disciplina"
            name="disciplina"
            onChange={handleChange}
            value={formData.disciplina}
            required
            placeholder="Disciplina"
          />
          <input
            className="input-item"
            type="number"
            id="nota01"
            name="nota01"
            value={formData.nota01}
            onChange={handleChange}
            required
            placeholder="Nota 01"
            min="0"
            max="10"
          />
          <input
            className="input-item"
            type="number"
            id="nota02"
            name="nota02"
            value={formData.nota02}
            onChange={handleChange}
            required
            placeholder="Nota 02"
            min="0"
            max="10"
          />
          <input
            className="input-item"
            type="number"
            id="notaApresentacao"
            name="notaApresentacao"
            value={formData.notaApresentacao}
            onChange={handleChange}
            required
            placeholder="Nota da Apresentação"
            min="0"
            max="10"
          />
          <input
            className="input-item"
            type="number"
            id="notaTrabalho"
            name="notaTrabalho"
            value={formData.notaTrabalho}
            onChange={handleChange}
            required
            placeholder="Nota do Trabalho"
            min="0"
            max="10"
          />
          <button className="salvar-btn">Salvar</button>
        </form>
      </div>
    </>
  );
}
export default FormPage;
