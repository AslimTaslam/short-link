import { Link } from "react-router-dom";

const LinksCard = ({ links }) => {
	const showLinks = links.map((item) => {
		return (
			<li
				className="list-group-item d-flex justify-content-between align-items-center"
				key={item.link_id}
			>
				<span className="d-inline-block text-truncate col-10 ">
					{item.link}
				</span>
				<Link className="btn btn-sm btn-info" to={`/detail/${item.code}`}>
					Detail
				</Link>
			</li>
		);
	});

	if (links.length === 0) {
		return (
			<>
				<h3 className="text-center text-warning mt-4">You don't have a link</h3>
				<Link className="btn btn-info float-roght mt-3" to="/create">
					Go to create page
				</Link>
			</>
		);
	}
	return <ul className="list-group list-group-flush">{showLinks}</ul>;
};

export default LinksCard;
