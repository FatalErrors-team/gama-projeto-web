import Home from "./Home";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import FormPage from "./FormPage/FormPage";
import FormPageAtualizar from "./FormPageAtualizar/FormPageAtualizar";

async function obterAdministrador(setAdministrador, redirectUrl) {

	try {
		const response = await axios({
			method: "GET",
			url: "https://gama-alunos-node.herokuapp.com/administrador",
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		});
		if (response.status === 200) {
			setAdministrador(response.data.data);
		}
	} catch {
		window.location.href = redirectUrl;
	}
}

function Principal() {
	const [administrador, setAdministrador] = useState({});
	
	useEffect(() => {
		const redirectUrl = (window.location.protocol + "//" + window.location.hostname + ":" + window.location.port);
		obterAdministrador(setAdministrador, redirectUrl);
	}, []);

	return (
		<>
			<NavBar administrador={administrador} />
			<Switch>
				<Route path="/atualizar-aluno/:id">
					<FormPageAtualizar />
				</Route>
				<Route path="/cadastro-de-alunos">
					<FormPage />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
			<Footer />
		</>
	);
}

export default Principal;
