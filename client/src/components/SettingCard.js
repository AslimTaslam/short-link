import ModalUserEdit from "./ModalUserEdit";

const SettingCard = ({
	form,
	changeHandler,
	editUserData,
	closeModal,
	deleteUserData,
}) => {
	return (
		<div className="card border-info">
			<div className="card-body">
				<div className="pb-3 mb-3 border-bottom">
					<span>
						Name: <strong>{form.name}</strong>
					</span>
					<ModalUserEdit
						form={form}
						name="name"
						changeHandler={changeHandler}
						editUserData={editUserData}
						closeModal={closeModal}
					/>
				</div>
				<div className="pb-3 mb-3 border-bottom">
					<span>
						Email: <strong>{form.email}</strong>
					</span>
					<ModalUserEdit
						form={form}
						name="email"
						changeHandler={changeHandler}
						editUserData={editUserData}
						closeModal={closeModal}
					/>
				</div>
				<div>
					<span>
						Password: <strong>******</strong>
					</span>
					<ModalUserEdit
						form={form}
						name="password"
						changeHandler={changeHandler}
						editUserData={editUserData}
						closeModal={closeModal}
					/>
				</div>
			</div>
			<div className="card-footer">
				<button className="btn btn-danger" onClick={deleteUserData}>
					Delete user
				</button>
			</div>
		</div>
	);
};

export default SettingCard;
