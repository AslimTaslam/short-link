import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes.js";
import ErrorBoundary from "./components/ErrorBoundary";
import { ShortLinkContextProvider } from "./context/ShortLinkContext";

import "./App.css";

const App = () => {
	const routes = useRoutes(false);
	return (
		<ErrorBoundary>
			<ShortLinkContextProvider>
				<BrowserRouter>
					<div className="container">
						<h1 className="text-center text-info mt-2">Short list</h1>
						{routes}
					</div>
				</BrowserRouter>
			</ShortLinkContextProvider>
		</ErrorBoundary>
	);
};

export default App;
