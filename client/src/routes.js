import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/AuthPage.js";
import CreatePage from "./pages/CreatePage.js";
import LinksPage from "./pages/LinksPage.js";
import DetailPage from "./pages/DetailPage.js";

const useRoutes = (isAuthenticated) => {
	if(isAuthenticated) {
		return (
			<Routes>
				<Route path="create" element={<CreatePage/>}/>
				<Route path="links" element={<LinksPage/>}/>
				<Route path="detail/:id" element={<DetailPage/>}/>
				<Route path="*" element={<Navigate to="/links" replace/>}/>
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path="/" element={<AuthPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

export { useRoutes };
