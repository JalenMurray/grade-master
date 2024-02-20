import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import ClassCard from '../components/class-components/ClassCard';
import SemesterHeader from '../components/SemesterHeader';

function SemesterPage() {
  const { id } = useParams();
  const [semester, setSemester] = useState({});

  useEffect(() => {
    const fetchSemester = async () => {
      const response = await getData(`/semesters/${id}`);
      if (response.success) {
        setSemester(response.data);
      }
    };
    fetchSemester();
  }, []);

  return (
    <div className="font-montserrat">
      <Nav />
      <div className="min-h-screen h-fit w-screen dark:bg-dark-bg py-6 text-white">
        <SemesterHeader semester={semester} />
        <div className="flex gap-4 w-4/5 mx-auto my-16">
          {semester.classes && semester.classes.map((cls, i) => <ClassCard key={i} cls={cls} />)}
        </div>
      </div>
    </div>
  );
}

export default SemesterPage;
