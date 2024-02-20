// Functions

// Components
import NavIcon from './NavIcon';

// Icon Imgs
import { List, SpaceDashboard, AccountCircle, Class } from '@mui/icons-material';
import { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user';

function Nav() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user.user_name) {
      setUsername(user.first_name ? user.first_name : user.user_name);
    } else {
      setUsername('Guest');
    }
  }, [user]);

  return (
    <div className="h-[10vh] flex gap-6 sm:gap-8 md:gap-16 justify-center items-center dark:bg-dark-bg dark:text-white">
      <NavIcon
        icon={<img src="/src/assets/logo.png" alt="Logo" className="w-16 h-16 rounded-full" />}
        txt={null}
        link="/"
      />
      {user.user_name && (
        <Fragment>
          <NavIcon
            icon={<SpaceDashboard className="dark:color-white" fontSize="large" />}
            txt={'Current Semester'}
            link={`/semester/${user.current_semester}`}
          />
          <NavIcon icon={<List className="dark:color-white" fontSize="large" />} txt={'Semesters'} link="/semesters" />
        </Fragment>
      )}
      <NavIcon icon={<Class className="color-white" fontSize="large" />} txt={'Guest Class'} link="/guest-class" />
      <NavIcon
        icon={<AccountCircle className="dark:color-white" fontSize="large" />}
        txt={username}
        link={user.user_name ? '/user' : '/auth'}
      />
    </div>
  );
}

export default Nav;
