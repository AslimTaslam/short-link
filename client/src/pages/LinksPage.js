import { useState, useEffect, useCallback } from "react";
import { useService } from "../hooks/apiHook";
import SearchPanel from "../components/SearchPanel";
import LinksCard from "../components/LinksCard";
import Loader from "../components/Loader";

const LinksPage = () => {
	const { getLinks } = useService();
	const [links, setLinks] = useState([]);
	const [linksView, setLinksView] = useState([]);
	const [ready, setReady] = useState(false);

	const loadLinks = async () => {
		const res = await getLinks();
		setLinks(res.data);
	};

	const searchLink = useCallback((url) => {
		if (url.length === 0) {
			return setLinksView(links);
		}
		const newLinks = links.filter((item) => {
			return item.link.toLowerCase().includes(url.toLowerCase());
		});
		setLinksView(newLinks);
	}, [links]);

	useEffect(() => {
		loadLinks();
		setReady(true);
	}, []);

	if (!ready) {
		return <Loader />;
	}

	return (
		<>
			<h2 className="text-center text-info mb-3">Links list</h2>
			<SearchPanel searchLink={searchLink} />
			<LinksCard links={linksView} />
		</>
	);
};

export default LinksPage;
