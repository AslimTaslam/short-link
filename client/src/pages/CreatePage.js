import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useService } from "../hooks/apiHook";
import CreateCard from "../components/CreateCard";

const CreatePage = () => {
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);
	const { createLink } = useService();
	const [ linkUrl, setLinkUrl ] = useState("");

	const changeHandler = (e) => {
		setLinkUrl(e.target.value);
	}

	const createHandler = async () => {
		await createLink(linkUrl, token);
		navigate("/links");
	}

	return (
		<CreateCard linkUrl={linkUrl} changeHandler={changeHandler} createHandler={createHandler} />
	);
};

export default CreatePage;
