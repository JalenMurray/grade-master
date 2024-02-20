// import SocialButtons from './SocialButtons';
import { useContext, useState } from 'react';
import { signIn } from '../../utils/api';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSignIn = async () => {
    const response = await signIn(formData);
    if (!response.success) {
      toast.error(response.msg, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: toast.Bounce,
      });
    } else {
      login();
      navigate('/class/3');
    }
  };

  return (
    <div className="text-white w-2/5 px-4 mx-4">
      <h1 className="mb-8">Existing account?</h1>
      <h1 className="text-[48px]">Sign In</h1>
      {/* <SocialButtons /> */}
      <p className="py-4">Or use your email and password</p>
      <div className="text-black flex flex-col justify-center text-center items-center">
        <input
          className={`auth-input`}
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className={`auth-input`}
          name="password"
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div className="auth-button w-[128px] my-4 py-3 mx-auto" onClick={handleSignIn}>
        <p>SIGN IN</p>
      </div>
    </div>
  );
}

export default SignIn;
