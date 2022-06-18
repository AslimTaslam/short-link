import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes.js";
import ErrorBoundary from "./components/ErrorBoundary";
import { ShortLinkContextProvider } from "./context/ShortLinkContext";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/authHook";
import Navbar from "./components/Navbar";

import "./App.css";

const App = () => {
	const { login, logout, token, userId, ready } = useAuth();
	const isAuthenticated = !!token;
	const routes = useRoutes(isAuthenticated);

	return (
		<ErrorBoundary>
			<AuthContext.Provider
				value={{
					login,
					logout,
					token,
					userId,
					isAuthenticated,
				}}
			>
				<ShortLinkContextProvider>
					<BrowserRouter>
						{isAuthenticated ? (
							<Navbar />
						) : (
							<h1 className="text-center text-info mt-2">Short list</h1>
						)}
						<div className="container">{routes}</div>
					</BrowserRouter>
				</ShortLinkContextProvider>
			</AuthContext.Provider>
		</ErrorBoundary>
	);
};

export default App;
