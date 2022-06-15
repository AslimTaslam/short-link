import axios from "axios";

const useService = () => {
	const createUser = async (form) => {
		try {
			console.log(form);
			const data = await axios.post("/auth/register", form);
			console.log(data);
			return data;
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	return {
		createUser,
	};
};

export { useService };
