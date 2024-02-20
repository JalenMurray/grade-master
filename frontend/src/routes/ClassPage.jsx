import ClassHeader from '../components/class-components/ClassHeader';
import GradeCalculator from '../components/class-components/GradeCalculator';
import Nav from '../components/Nav';
import ProgressBar from '../components/class-components/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect } from 'react';
import { ClassContext } from '../contexts/class';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/api';
import Warnings from '../components/class-components/Warnings';

function ClassPage() {
  const { id } = useParams();
  const { cls, warnings, setIsGuest, setCls, setAssignmentTypes } = useContext(ClassContext);

  useEffect(() => {
    const fetchClass = async () => {
      const response = await getData(`/classes/${id}`);
      const foundClass = response.data;

      const assignmentTypes = foundClass.assignment_types.reduce((acc, obj) => {
        acc[obj.id] = { ...obj };
        return acc;
      }, {});
      setCls(foundClass);
      setAssignmentTypes(assignmentTypes);
      setIsGuest(false);
    };
    fetchClass();
  }, []);

  return (
    <div className="font-montserrat">
      <Nav />
      <div className="min-h-screen h-fit w-screen dark:bg-dark-bg py-6">
        <ClassHeader guest={false} />
        <Warnings warnings={warnings} />
        <ProgressBar score={cls.score || 0} />
        <GradeCalculator guest={false} />
      </div>
    </div>
  );
}

export default ClassPage;
