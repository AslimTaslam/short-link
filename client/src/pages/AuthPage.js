import { useState, useContext } from "react";
import { useService } from "../hooks/apiHook";
import { ShortLinkContext } from "../context/ShortLinkContext";
import RegisterCard from "../components/RegisterCard";
import LoginCard from "../components/LoginCard";

const AuthPage = () => {
	const { createUser, loginUser } = useService();
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
			await createUser(form);
		} catch (err) {
			console.error(err);
		}
	};

	const loginHandler = async () => {
		try {
			const data = await loginUser(form);
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		card ? (
		<RegisterCard
			toggleCard={toggleCard}
			changeHandler={changeHandler}
			createHandler={createHandler}
			form={form}
		/>
		) : (
		<LoginCard
			toggleCard={toggleCard}
			changeHandler={changeHandler}
			loginHandler={loginHandler}
			form={form}
		/>
		)
	);
};

export default AuthPage;
