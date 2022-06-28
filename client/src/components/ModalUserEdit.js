const ModalUserEdit = ({ form, name, changeHandler, editUserData, closeModal }) => {

	const inputType =
		name !== "password" ? (
			<>
				<label htmlFor={`${name}Form`}>Enter new {name}</label>
				<input
					className="form-control mb-3"
					id={`${name}Form`}
					type="text"
					name={name}
					placeholder={`Enter new ${name}`}
					onChange={changeHandler}
					value={form[name]}
				/>
			</>
		) : (
			<>
				<label htmlFor="oldPassword">Old password</label>
				<input
					className="form-control mb-3"
					id="oldPassword"
					type="password"
					name="oldPassword"
					placeholder={`Enter old ${name}`}
					onChange={changeHandler}
					value={form[name]}
				/>
				<label htmlFor="newPassword">New password</label>
				<input
					className="form-control mb-3"
					id="newPassword"
					type="password"
					name="newPassword"
					placeholder={`Enter new ${name}`}
					onChange={changeHandler}
					value={form[name]}
				/>
				<label htmlFor="confirmPassword">Confirm password</label>
				<input
					className="form-control mb-3"
					id="confirmPassword"
					type="password"
					name="confirmPassword"
					placeholder={`Confirm new ${name}`}
					onChange={changeHandler}
					value={form[name]}
				/>
			</>
		);

	return (
		<>
			<button
				type="button"
				className="btn btn-sm btn-info float-right"
				data-bs-toggle="modal"
				data-bs-target={`#${name}EditModal`}
			>
				Edit
			</button>

			<div
				className="modal fade"
				id={`${name}EditModal`}
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
				onClick={closeModal}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								{`Edit ${name}`}
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={closeModal}
							></button>
						</div>
						<div className="modal-body">{inputType}</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={closeModal}
							>
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => editUserData(name)}
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalUserEdit;
