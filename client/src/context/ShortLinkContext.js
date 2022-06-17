import { useState, createContext } from "react";

const ShortLinkContext = createContext();

const ShortLinkContextProvider = (props) => {
	const [errors, setErrors] = useState(undefined);
	const [links, setLinks] = useState([]);

	const addErrors = (err) => {
		setErrors(err);
	};

	const clearErrors = () => {
		setErrors(undefined);
	};

	const addLinks = (items) => {
		setLinks(items);
	};

	return (
		<ShortLinkContext.Provider
			value={{
				errors,
				addErrors,
				clearErrors,
				links,
				addLinks
			}}
		>
			{props.children}
		</ShortLinkContext.Provider>
	);
};

export { ShortLinkContext, ShortLinkContextProvider };
