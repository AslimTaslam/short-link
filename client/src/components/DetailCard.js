const DetailCard = ({ link, deleteData, backPage, incClicks }) => {
	return (
		<>
			<h2 className="text-center text-info mb-3">Detail link</h2>
			<div className="card border-info">
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<label className="mr-2">Your link:</label>
						<a
							className="text-info"
							href={link.link}
							rel="noreferrer noopener"
							target="_blank"
						>
							{link.link}
						</a>
					</li>
					<li className="list-group-item">
						<label className="mr-2">Your short link:</label>
						<a
							className="text-info"
							rel="noreferrer noopener"
							target="_blank"
							href={link.short_link}
							onClick={incClicks}
						>
							{link.short_link}
						</a>
					</li>
					<li className="list-group-item">
						<label className="mr-2">Code:</label>
						{link.code}
					</li>
					<li className="list-group-item">
						<label className="mr-2">Date added: </label>
						<span className="mr-2">
							<strong>{new Date(link.date_added).toLocaleDateString()}</strong>
						</span>
						<span>
							<strong>{new Date(link.date_added).toLocaleTimeString()}</strong>
						</span>
					</li>
					<li className="list-group-item">
						<label className="mr-2">Clicks:</label>
						{link.clicks}
					</li>
				</ul>
				<div className="card-footer">
					<button className="btn btn-danger mr-2" onClick={deleteData}>
						Delete
					</button>
					<button className="btn btn-warning float-right" onClick={backPage}>
						Go back
					</button>
				</div>
			</div>
		</>
	);
};

export default DetailCard;
