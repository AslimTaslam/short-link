import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useService } from "../hooks/apiHook";
import DetailCard from "../components/DetailCard";
import Loader from "../components/Loader";

const DetailPage = () => {
	const navigate = useNavigate();
	const { getLink, deleteLink } = useService();
	const { id } = useParams();
	const [link, setLink] = useState({});
	const [ready, setReady] = useState(false);

	const loadData = async () => {
		const res = await getLink(id);
		setLink(res.data);
		setReady(true);
	};

	const deleteData = async () => {
		await deleteLink(id);
		navigate("/links");
	};

	const backPage = () => {
		navigate("/links");
	};

	useEffect(() => {
		loadData();
	}, []);

	if (!ready) {
		return <Loader />;
	}
	return <DetailCard link={link} deleteData={deleteData} backPage={backPage} />;
};

export default DetailPage;
