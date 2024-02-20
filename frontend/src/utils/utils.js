import { toast } from 'react-toastify';

export const formatFloat = (num, n) => {
  if (num) {
    if (typeof num == 'string') {
      return parseFloat(parseFloat(num).toFixed(n));
    } else {
      return parseFloat(num.toFixed(n));
    }
  }
  return 0;
};

export const COLOR_ZONES = ['#FF0000', '#FFC100', '#FFFF00', '#D6FF00', '#63FF00'];

export const showErrorToast = (msg) => {
  toast.error(msg, {
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
};

export const validateSignUp = ({ email, user_name, password, confirmpassword }) => {
  // Ensure all fields were added
  if (!email) {
    return { valid: false, option: 'email', msg: 'Email must be provided' };
  }
  if (!user_name) {
    return { valid: false, option: 'user_name', msg: 'Username must be provided' };
  }
  if (!password) {
    return { valid: false, option: 'password', msg: 'Password must be provided' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, option: 'email', msg: 'Invalid email provided' };
  }

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,149}$/;
  if (!usernameRegex.test(user_name)) {
    return { valid: false, option: 'user_name', msg: 'Invalid username provided' };
  }

  if (password.length < 8) {
    return { valid: false, option: 'password', msg: 'Password must be at least 8 characters' };
  }

  if (password.length > 150) {
    return { valid: false, option: 'password', msg: 'Password must be less then 150 characters' };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, option: 'password', msg: 'Password must include an uppercase letter' };
  }

  if (password !== confirmpassword) {
    return { valid: false, option: 'password', msg: 'Passwords do not match' };
  }

  return { valid: true };
};
