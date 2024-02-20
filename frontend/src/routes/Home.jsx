import { useContext } from 'react';
// import Carousel from '../components/Carousel';
import Nav from '../components/Nav';
import { UserContext } from '../contexts/user';
import { useNavigate } from 'react-router-dom';
import Features from '../components/Features';

function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const goToCurrentSemester = () => {
    if (user.current_semester) {
      navigate(`/semester/${user.current_semester}`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="font-montserrat">
      <Nav />
      <section className="h-[90vh] bg-dark-bg text-white flex flex-col justify-center items-center text-center">
        <h1 className="text-[6rem]">Grade Master</h1>
        <p className="text-[1.2rem]">Your go-to tool for tracking assignments, calculating grades, and more!</p>
        <div className="flex gap-4 mt-4 text-lg">
          <a href="/guest-class">
            <button className="p-3 border-2 border-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700">
              Use as Guest
            </button>
          </a>
          <a onClick={goToCurrentSemester}>
            <button className="p-3 border-2 border-white rounded-lg bg-blue-700 hover:bg-blue-800 active:bg-blue-900">
              Login
            </button>
          </a>
        </div>
      </section>
      <section className="h-[50vh] bg-[#D0C2B5] flex">
        <div className="flex flex-col w-2/5 text-center justify-center items-center">
          <h1 className="text-[4rem] my-4">Features</h1>
          <p className="text-[2rem]">
            Explore the key features that set GradeMaster apart. Create and manage classes effortlessly, customize
            assignment types and weights for precise grading, and let our smart calculator handle the complexities,
            giving you the insights you need for academic excellence.
          </p>
        </div>
        <div className="w-3/5">
          <Features />
        </div>
      </section>
    </div>
  );
}

export default Home;
