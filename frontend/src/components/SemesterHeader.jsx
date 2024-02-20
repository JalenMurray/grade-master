import { AddCircleOutline, Delete, Edit } from '@mui/icons-material';
import { formatFloat } from '../utils/utils';
import AddClassModal from './class-components/modals/AddClassModal';
import { useState } from 'react';
import EditSemesterModal from './class-components/modals/EditSemesterModal';
import ConfirmDeleteModal from './class-components/modals/ConfirmDeleteModal';
import BackButton from './BackButton';

function SemesterHeader({ semester }) {
  const [newClassModalOpen, setNewClassModalOpen] = useState(false);
  const [editSemesterModalOpen, setEditSemesterModalOpen] = useState(false);
  const [deleteSemesterModalOpen, setDeleteSemesterModalOpen] = useState(false);

  return (
    <div className="ml-6">
      <BackButton text={'Semesters'} />
      <h1 className="text-[48px] px-10 py-4">
        {semester.season} {semester.year}
        <span className="px-4 text-[24px]">GPA: {formatFloat(semester.gpa, 2)}</span>
      </h1>
      <div className="flex gap-4 px-10">
        <button
          className="class-button py-2 px-3 bg-green-600 hover:bg-green-700 active:bg-green-800"
          onClick={() => setNewClassModalOpen(true)}
        >
          <AddCircleOutline />
          Add Class
        </button>
        <button
          className="class-button py-2 px-3 bg-gray-500 hover:bg-gray-600 active:bg-gray-700"
          onClick={() => setEditSemesterModalOpen(true)}
        >
          <Edit />
          Edit Semester
        </button>
        <button
          className="class-button py-2 px-3 bg-red-500 hover:bg-red-600 active:bg-red-700"
          onClick={() => setDeleteSemesterModalOpen(true)}
        >
          <Delete />
          Delete Semester
        </button>
      </div>
      <AddClassModal open={newClassModalOpen} setOpen={setNewClassModalOpen} semester={semester} />
      <EditSemesterModal open={editSemesterModalOpen} setOpen={setEditSemesterModalOpen} semester={semester} />
      <ConfirmDeleteModal
        open={deleteSemesterModalOpen}
        setOpen={setDeleteSemesterModalOpen}
        msg={`Are you sure you wish to delete the semester ${semester.season} ${semester.year}.  All classes associated with this semester will also be deleted.`}
        url={`/semesters/${semester.id}`}
        toLink={'/semesters'}
      />
    </div>
  );
}

export default SemesterHeader;
