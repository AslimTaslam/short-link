import { useState, useEffect, useCallback } from "react";

const storageName = "userData";

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	const login = useCallback((jwt, id) => {
		setToken(jwt);
		setUserId(id);
		localStorage.setItem(
			storageName,
			JSON.stringify({ token: jwt, userId: id })
		);
	}, []);

	const logout = () => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem(storageName);
	};

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));
		if (data && data.token) {
			login(data.token, data.userId);
		}
	}, [login]);

	return { login, logout, token, userId };
};
