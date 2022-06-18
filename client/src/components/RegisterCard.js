const RegisterCard = ({toggleCard, changeHandler, createHandler, form, errors}) => {
	return(
		<div className="card text-light bg-info mt-2">
			<div className="card-header">
				<h2 className="card-title text-warning text-center">Registration</h2>
			</div>
			<div className="card-body">
				<div className="mb-2">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						name="email"
						className="form-control"
						id="email"
						placeholder="email@example.com"
						onChange={changeHandler}
						value={form.email}
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						name="password"
						className="form-control"
						id="password"
						placeholder="password"
						onChange={changeHandler}
						value={form.password}
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						name="name"
						className="form-control mb-3"
						id="name"
						placeholder="name"
						onChange={changeHandler}
						value={form.name}
					/>
				</div>
				<span className="text-danger"> {errors}</span>
			</div>
			<div className="card-footer">
				<button className="btn btn-success mr-2" onClick={createHandler}>
					Enter
				</button>
				<button className="btn btn-warning mr-2" onClick={toggleCard}>
					Login
				</button>
			</div>
		</div>
	);
};

export default RegisterCard;
