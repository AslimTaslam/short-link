const CreateCard = ({linkUrl, changeHandler, createHandler}) => {
	return (
		<>
			<h2 className="text-center text-info mb-4">Create short link</h2>
			<label htmlFor="input-link">Put your link url:</label>
			<input
				className="form-control mb-3"
				id="input-link"
				type="text"
				placeholder="http://longlink.com/"
				value={linkUrl}
				onChange={changeHandler}
			/>
			<button className="btn btn-success" onClick={createHandler}>
				Create
			</button>
		</>
	);
};

export default CreateCard;
