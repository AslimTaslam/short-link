import { useState, useEffect, useContext } from 'react';
import { useService } from '../services/apiHook';
import { AuthContext } from '../context/AuthContext';
import { SettingCard } from '../components/SettingCard';

const SettingPage = () => {
  const { logout } = useContext(AuthContext);
  const { getUser, editUser, deleteUser } = useService();
  const [form, setForm] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const closeModal = () => {
    loadData();
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadData = async () => {
    const res = await getUser();
    setForm({ ...form, ...res.data });
  };

  const editUserData = async (action) => {
    if (action === 'name') {
      const { name } = form;
      await editUser({ name });
    }
    if (action === 'email') {
      const { email } = form;
      await editUser({ email });
    }
    if (action === 'password') {
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
      <h2 className='text-center text-info mb-3'>SettingPage</h2>
      <SettingCard
        form={form}
        changeHandler={changeHandler}
        closeModal={closeModal}
        editUserData={editUserData}
        deleteUserData={deleteUserData}
      />
    </>
  );
};

export default SettingPage;
