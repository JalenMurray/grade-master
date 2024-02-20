import { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { UserContext } from '../contexts/user';
import SemesterCard from '../components/SemesterCard';
import { AddCircleOutline } from '@mui/icons-material';
import AddSemesterModal from '../components/class-components/modals/AddSemesterModal';

function SemestersPage() {
  const { user } = useContext(UserContext);
  const [semesters, setSemesters] = useState([]);
  const [addSemesterPageOpen, setAddSemesterPageOpen] = useState(false);

  useEffect(() => {
    if (user.semesters) {
      setSemesters(user.semesters);
      console.log(user.semesters);
    }
  }, [user]);

  return (
    <div className="font-montserrat">
      <Nav />
      <div className="min-h-screen h-fit w-screen dark:bg-dark-bg py-6 text-white">
        <div className="flex gap-8 ml-6">
          <h1 className="text-[72px]">Semesters</h1>
          <button
            className="class-button w-[128px] py-2 px-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-xl"
            onClick={() => setAddSemesterPageOpen(true)}
          >
            <AddCircleOutline />
            Add Semester
          </button>
        </div>
        <div className="flex flex-col gap-4 w-4/5 mx-auto my-16">
          {semesters && semesters.map((semester, i) => <SemesterCard key={i} semester={semester} />)}
        </div>
      </div>
      <AddSemesterModal open={addSemesterPageOpen} setOpen={setAddSemesterPageOpen} />
    </div>
  );
}

export default SemestersPage;
