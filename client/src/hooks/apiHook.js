import { useContext } from "react";
import axios from "axios";
import { ShortLinkContext } from "../context/ShortLinkContext";

const useService = () => {
	const { addErrors } = useContext(ShortLinkContext);
	const createUser = async (form) => {
		try {
			return await axios.post("/auth/register", form);
		} catch (err) {
			addErrors(err.response.data.message);
			console.error(err.response.data.message);
		}
	};

	const loginUser = async ({email, password}) => {
		try {
			const data = await axios.post("/auth/login", {email, password});
			console.log(data);
			return data;
		} catch (err) {
			addErrors(err.response.data.message);
			console.error(err.response.data.message);
		}
	};

	return {
		createUser,
		loginUser
	};
};

export { useService };
