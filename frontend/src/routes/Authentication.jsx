import Nav from '../components/Nav';
import SignIn from '../components/auth-components/SignIn';

import SignUp from '../components/auth-components/SignUp';

function Authentication() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen h-fit w-screen dark:bg-dark-bg py-6 flex justify-center text-center ">
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
}

export default Authentication;
