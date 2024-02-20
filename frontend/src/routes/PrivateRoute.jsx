import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/user';
import { getData } from '../utils/api';

function PrivateRoute({ urlBase }) {
  const { id } = useParams();
  const { user, isAuthenticating } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async (url) => {
      const response = await getData(url);
      setIsAuthenticated(response.success);
    };
    if (user.user_name) {
      if (id) {
        checkAuth(`${urlBase}${id}`);
      } else {
        checkAuth(urlBase);
      }
    }
  }, [isAuthenticating]);

  if (isAuthenticated === null || isAuthenticating) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/auth'} state={{ from: location }} replace />;
}

export default PrivateRoute;
