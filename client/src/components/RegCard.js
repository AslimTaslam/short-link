const RegCard = ({toggleCard, changeHandler, createHandler, form}) => {
	return (
		<div className="card">
			<div className="card-header">
				<h1 className="card-title text-center">Registration</h1>
			</div>
			<div className="card-body">
				<label htmlFor="emailForm" className="form-label">
					Email
				</label>
				<input
					type="email"
					name="email"
					className="form-control"
					id="emailForm"
					placeholder="example@gmail.com"
					onChange={changeHandler}
					value={form.email}
				/>
				<label htmlFor="passwordForm" className="form-label">
					Password
				</label>
				<input
					type="password"
					name="password"
					className="form-control"
					id="passwordForm"
					placeholder="YourPassword"
					onChange={changeHandler}
					value={form.password}
				/>
				<label htmlFor="nameForm" className="form-label">
					Name
				</label>
				<input
					type="text"
					name="name"
					className="form-control"
					id="nameForm"
					placeholder="Muhammad"
					onChange={changeHandler}
					value={form.name}
				/>
			</div>
			<div className="card-footer">
				<button
					className="btn btn-success"
					onClick={createHandler}
				>
					Enter
				</button>
				<button
					className="btn btn-warning m-2"
					onClick={toggleCard}
				>Authorization</button>
			</div>
		</div>
	);
};

export default RegCard;
