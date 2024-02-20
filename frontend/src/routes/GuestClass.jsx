import ClassHeader from '../components/class-components/ClassHeader';
import GradeCalculator from '../components/class-components/GradeCalculator';
import Nav from '../components/Nav';
import ProgressBar from '../components/class-components/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect } from 'react';
import { ClassContext } from '../contexts/class';
import Warnings from '../components/class-components/Warnings';

function GuestClass() {
  const { cls, warnings, setIsGuest } = useContext(ClassContext);

  useEffect(() => {
    setIsGuest(true);
  });

  return (
    <div className="font-montserrat">
      <Nav />
      <div className="min-h-screen h-fit w-screen dark:bg-dark-bg py-6">
        <ClassHeader />
        <Warnings warnings={warnings} />
        <ProgressBar score={cls.score || 0} />
        <GradeCalculator />
      </div>
    </div>
  );
}

export default GuestClass;
