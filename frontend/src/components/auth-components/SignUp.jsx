import { useState } from 'react';
// import SocialButtons from './SocialButtons';
import { validateSignUp } from '../../utils/utils';
import { signUp } from '../../utils/api';
import { toast } from 'react-toastify';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    user_name: '',
    password: '',
    confirmpassword: '',
  });
  const [emailErrors, setEmailErrors] = useState('');
  const [usernameErrors, setUsernameErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');

  const handleSignUp = async () => {
    // Reset all errors
    setEmailErrors('');
    setUsernameErrors('');
    setPasswordErrors('');

    const validated = validateSignUp(formData);
    if (validated.valid) {
      const response = await signUp(formData);
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
        console.log(response.tokens);
      }
    } else {
      const option = validated.option;
      if (option === 'email') {
        setEmailErrors(validated.msg);
      } else if (option === 'user_name') {
        setUsernameErrors(validated.msg);
      } else if (option === 'password') {
        setPasswordErrors(validated.msg);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="text-white w-2/5 px-4 mx-4">
      <h1 className="mb-8">Don&apos;t have an account?</h1>
      <h1 className="text-[48px]">Create Account</h1>
      {/* <SocialButtons /> */}
      <p className="py-4">Or use your email to sign up</p>
      <div className="text-black flex flex-col justify-center text-center items-center">
        {emailErrors && (
          <div>
            <p className="font-bold text-red-600">{emailErrors}</p>
          </div>
        )}
        <input
          className={`auth-input ${emailErrors ? 'border-5 border-red-600' : ''}`}
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        {usernameErrors && (
          <div>
            <p className="font-bold text-red-600">{usernameErrors}</p>
          </div>
        )}
        <input
          className={`auth-input ${usernameErrors ? 'border-5 border-red-600' : ''}`}
          name="user_name"
          type="text"
          value={formData.user_name}
          placeholder="Username"
          onChange={handleChange}
        />
        {passwordErrors && (
          <div>
            <p className="font-bold text-red-600">{passwordErrors}</p>
          </div>
        )}
        <input
          className={`auth-input ${passwordErrors ? 'border-5 border-red-600' : ''}`}
          name="password"
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          className={`auth-input`}
          name="confirmpassword"
          type="password"
          value={formData.confirmpassword}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
      </div>
      <div className="auth-button w-[128px] my-4 py-3 mx-auto" onClick={handleSignUp}>
        <p>SIGN UP</p>
      </div>
    </div>
  );
}

export default SignUp;
