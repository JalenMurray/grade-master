import axios from 'axios';

const baseURL = 'http://localhost:8000/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === 'undefined') {
      alert(
        'A server/network error occurred. ' +
          'Looks like CORS might be the problem. ' +
          'Sorry about this - we will get it fixed shortly.'
      );
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === baseURL + 'token/refresh/') {
      window.location.href = '/auth';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post('auth/token/refresh/', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem('access_token', response.data.access);

              axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
              originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          return Promise.reject(error);
        }
      } else {
        console.log('Refresh token not available.');
        return Promise.reject(error);
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

const getErrors = (err) => {
  const response = err.response;
  if (err.code === 'ERR_NETWORK') {
    return { success: false, msg: err.message };
  }
  if (response) {
    return { success: false, msg: response.data.detail };
  }
  return;
};

export const signUp = async (userInfo) => {
  try {
    await axiosInstance.post('auth/register/', userInfo);
    // If successfully signup then login
    const signIn = await axiosInstance.post('auth/token/', userInfo);
    localStorage.setItem('access_token', signIn.data.access);
    localStorage.setItem('refresh_token', signIn.data.refresh);
    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
    return { success: true, tokens: signIn.data };
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { success: false, msg: err.message };
    } else if (err.response.status == 400) {
      return { success: false, msg: err.response.data.detail };
    } else if (err.response.status == 401) {
      return { success: false, msg: err.response.data.detail };
    }
    return { success: false, msg: 'Unable to Sign In' };
  }
};

export const signIn = async (userInfo) => {
  try {
    const signIn = await axiosInstance.post('auth/token/', userInfo);
    localStorage.setItem('access_token', signIn.data.access);
    localStorage.setItem('refresh_token', signIn.data.refresh);
    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
    return { success: true };
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { success: false, msg: err.message };
    } else if (err.response.status == 400) {
      return { success: false, msg: 'Invalid data provided' };
    } else if (err.response.status == 401) {
      return { success: false, msg: err.response.data.detail };
    }
    return { success: false, msg: 'Unable to Sign In' };
  }
};

export const signOut = async () => {
  try {
    await axiosInstance.post('auth/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    return { success: true };
  } catch (err) {
    const errors = getErrors(err);
    return errors;
  }
};

export const getData = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return { success: true, data: response.data };
  } catch (err) {
    const errors = getErrors(err);
    return errors;
  }
};

export const getUser = async () => {
  const url = 'auth/user/';
  const data = await getData(url);
  return data;
};

export const addData = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return { success: true, data: response.data };
  } catch (err) {
    console.log(err);
    const errors = getErrors(err);
    return errors;
  }
};

export const destroyData = async (url) => {
  try {
    await axiosInstance.delete(url);
    return { success: true };
  } catch (err) {
    const errors = getErrors(err);
    return errors;
  }
};

export const patchData = async (url, toUpdate) => {
  try {
    await axiosInstance.patch(url, toUpdate);
    return { success: true };
  } catch (err) {
    const errors = getErrors(err);
    return errors;
  }
};
