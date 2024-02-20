import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from './contexts/user';

// Routes
import PageNotFound from './routes/PageNotFound';
import ClassPage from './routes/ClassPage';
import Authentication from './routes/Authentication';
import User from './routes/User';
import PrivateRoute from './routes/PrivateRoute';
import GuestClass from './routes/GuestClass';
import SemesterPage from './routes/SemesterPage';
import SemestersPage from './routes/SemestersPage';
import Home from './routes/Home';

const App = () => {
  const { login } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      await login();
    };
    fetchUser();
  }, []);

  return (
    <div className="font-montserrat">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={toast.Bounce}
      />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/class/:id" element={<PrivateRoute urlBase={'/classes/'} />}>
          <Route path="" element={<ClassPage />} />
        </Route>
        <Route path="/semester/:id" element={<PrivateRoute urlBase={'/semesters/'} />}>
          <Route path="" element={<SemesterPage />} />
        </Route>
        <Route path="/semesters" element={<PrivateRoute urlBase={'/semesters'} />}>
          <Route path="" element={<SemestersPage />} />
        </Route>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/user" element={<User />} />
        <Route path="/guest-class" element={<GuestClass />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
