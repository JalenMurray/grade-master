import { useContext, useEffect } from 'react';
import Nav from '../components/Nav';
import { UserContext } from '../contexts/user';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../utils/api';

function User() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  });

  const handleLogout = async () => {
    const response = await signOut();
    if (response.success) {
      setUser({});
      navigate('/auth');
    }
  };

  return (
    <div>
      <Nav />
      <div className="min-h-screen h-fit w-screen dark:bg-dark-bg py-6 flex flex-col text-center text-white items-center">
        <h1 className="text-[64px]">Welcome {user.first_name ? user.first_name : user.user_name}!</h1>
        <div>
          <h3>Email:</h3>
          <input value={user.email} className="user-input" />
          <h3>Username:</h3>
          <input value={user.user_name} className="user-input" />
          <h3>First Name:</h3>
          <input value={user.first_name} className="user-input" />
        </div>
        <button
          className="mt-8 py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default User;
