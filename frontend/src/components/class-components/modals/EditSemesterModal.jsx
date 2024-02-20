import VModal from '../../VModal';
import { useEffect, useState } from 'react';
import { patchData } from '../../../utils/api';

function EditSemesterModal({ open, setOpen, semester }) {
  const [selectedSeason, setSelectedSeason] = useState('Spring');
  const [isCurrent, setIsCurrent] = useState(false);
  const [year, setYear] = useState(0);

  useEffect(() => {
    setSelectedSeason(semester.season);
    setIsCurrent(semester.current);
    setYear(semester.year);
  }, [semester]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await patchData(`/semesters/${semester.id}`, {
      season: selectedSeason,
      year: year,
      current: isCurrent,
    });
    if (response.success) {
      window.location.reload();
    }
  };

  return (
    <VModal
      show={open}
      onHide={() => setOpen(false)}
      header={'Edit Semester'}
      body={
        <form onSubmit={handleEdit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label>Season</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="border-[1px] border-black rounded-lg p-2"
              >
                <option>Spring</option>
                <option>Summer</option>
                <option>Fall</option>
                <option>Winter</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border-[1px] border-black rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
              <label>Current Semester</label>
              <input type="checkbox" checked={isCurrent} onChange={() => setIsCurrent(!isCurrent)} />
            </div>
            <button
              className="text-white border-[1px] border-black py-2 px-2 rounded-lg bg-green-700 hover:bg-green-800 active:bg-green-900 w-48 my-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      }
    />
  );
}

export default EditSemesterModal;
