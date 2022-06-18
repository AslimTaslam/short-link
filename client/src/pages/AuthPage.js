import { useState, useContext } from "react";
import { useService } from "../hooks/apiHook";
import { useAuth } from "../hooks/authHook";
import { ShortLinkContext } from "../context/ShortLinkContext";
import RegisterCard from "../components/RegisterCard";
import LoginCard from "../components/LoginCard";

const AuthPage = () => {
	const { login } = useAuth();
	const { createUser, loginUser } = useService();
	const { errors, clearErrors } = useContext(ShortLinkContext);
	const [form, setForm] = useState({ email: "", password: "", name: "" });
	const [card, setCard] = useState(false);

	const toggleCard = () => {
		setCard(!card);
		setForm({ email: "", password: "", name: "" });
		clearErrors();
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
			const response = await loginUser(form);
			login(response.data.token, response.data.userId);	
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
			errors={errors}
		/>
		) : (
		<LoginCard
			toggleCard={toggleCard}
			changeHandler={changeHandler}
			loginHandler={loginHandler}
			form={form}
			errors={errors}
		/>
		)
	);
};

export default AuthPage;
