import { useContext } from "react";
import axios from "axios";
import { ShortLinkContext } from "../context/ShortLinkContext";
import { AuthContext } from "../context/AuthContext";

const useService = () => {
	const { addErrors } = useContext(ShortLinkContext);
	const { token } = useContext(AuthContext);

	const createUser = async (form) => {
		try {
			return await axios.post("/api/auth/register", form);
		} catch (err) {
			addErrors(err.response.data.message);
			console.error(err.response.data.message);
		}
	};

	const loginUser = async ({ email, password }) => {
		try {
			return await axios.post("/api/auth/login", { email, password });
		} catch (err) {
			addErrors(err.response.data.message);
			console.error(err.response.data.message);
		}
	};

	const getUser = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};
			return await axios.get(`/api/user/`, config);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	const editUser = async (data) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};
			return await axios.put(`/api/user/`, data, config);
		} catch (err) {
			console.error(err.response.data.message);
		}
	}

	const deleteUser = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};
			return await axios.delete(`/api/user/`, config);
		} catch (err) {
			console.error(err.response.data.message);
		}
	}

	const createLink = async (link_url) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			return await axios.post("/api/link/generate", { link_url }, config);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	const editLink = async (link_url, code) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			return await axios.put(`/api/link/${code}`, { link_url }, config);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};
	const getLinks = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			return await axios.get("/api/link/", config);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	const getLink = async (code) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};
			return  await axios.get(`/api/link/${code}`, config);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	const deleteLink = async (id) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			return await axios.delete(`/api/link/${id}`, config);
		} catch (err) {
			console.error(err.response.data.message);
		}
	};

	return {
		createUser,
		loginUser,
		getUser,
		editUser,
		deleteUser,
		createLink,
		getLinks,
		getLink,
		editLink,
		deleteLink,
	};
};

export { useService };
