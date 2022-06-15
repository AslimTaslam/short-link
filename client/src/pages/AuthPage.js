import { useState, useContext } from "react";
import { useService } from "../hooks/apiServiceHook.js";
import { ShortLinkContext } from "../context/ShortLinkContext";
import RegCard from "../components/RegCard";
import LogCard from "../components/LogCard";

const AuthPage = () => {
	const { createUser } = useService();
	const { errors } = useContext(ShortLinkContext);
	const [form, setForm] = useState({ email: "", password: "", name: "" });
	const [card, setCard] = useState(false);

	const toggleCard = () => {
		setCard(!card);
		setForm({ email: "", password: "", name: "" });
	}

	const changeHandler = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const createHandler = async () => {
		try {
			const data = await createUser(form);
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	const loginHandler = async () => {
		try {
		} catch (err) {
			console.error(err);
		}
	};

	console.log(form);

	return (
		card ? (
		<RegCard
			toggleCard={toggleCard}
			changeHandler={changeHandler}
			createHandler={createHandler}
			form={form}
		/>
		) : (
		<LogCard
			toggleCard={toggleCard}
			changeHandler={changeHandler}
			loginHandler={loginHandler}
			form={form}
		/>
		)
	);
};

export default AuthPage;
