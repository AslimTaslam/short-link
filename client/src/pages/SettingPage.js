import { useState, useEffect, useContext } from "react";
import { useService } from "../hooks/apiHook";
import { AuthContext } from "../context/AuthContext";
import ModalUserEdit from "../components/ModalUserEdit";

const SettingPage = () => {
	const { logout } = useContext(AuthContext);
	const { getUser, editUser, deleteUser } = useService();
	const [form, setForm] = useState({
		name: "",
		email: "",
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const closeModal = () => {
		loadData();	
	}

	const changeHandler = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const loadData = async () => {
		const res = await getUser();
		setForm({ ...form, ...res.data });
	};

	const editUserData = async (action) => {
		if (action === "name" || action === "email") {
			const { email, name } = form;
			await editUser({ email, name });
		}
		if (action === "password") {
			const { oldPassword, newPassword, confirmPassword } = form;
			if (newPassword === confirmPassword) {
				await editUser({ newPassword, oldPassword });
			}
		}
		closeModal();
	};

	const deleteUserData = async () => {
		await deleteUser();
		logout();
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<h2 className="text-center text-info mb-3">SettingPage</h2>
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
					<button
						className="btn btn-danger"
						onClick={deleteUserData}
					>Delete user</button>
				</div>
			</div>
		</>
	);
};


export default SettingPage;
