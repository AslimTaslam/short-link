import axios from "axios";

const useService = () => {
	const createUser = async (form) => {
		try {
			return await axios.post("/auth/register", form);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	const loginUser = async ({email, password}) => {
		try {
			const data = await axios.post("/auth/login", {email, password});
			console.log(data);
			return data;
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	return {
		createUser,
		loginUser
	};
};

export { useService };
