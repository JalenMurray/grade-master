import { formatFloat } from '../../utils/utils';
import { patchData } from '../../utils/api';
import { toast } from 'react-toastify';

import { AddCircleOutline, Lock, Delete, LockOpenRounded } from '@mui/icons-material';
import Assignment from './Assignment';
import { useContext, useEffect, useState } from 'react';
import { ClassContext } from '../../contexts/class';
import Accordion from '../Accordion';
import { addData, destroyData } from '../../utils/api';

function AssignmentType({ id }) {
  const { assignmentTypes, updateAssignmentType, addAssignment, removeAssignmentType, isGuest } =
    useContext(ClassContext);
  const [at, setAt] = useState({});
  const [openAccordian, setOpenAccordian] = useState(false);
  const [locked, setLocked] = useState(false);
  const [lostPoints, setLostPoints] = useState(0);

  useEffect(() => {
    setAt(assignmentTypes[id]);
    setLocked(assignmentTypes[id].lock_weights);
  }, [assignmentTypes]);

  useEffect(() => {
    setLostPoints(at.max_total_score - at.total_score);
  }, [at]);

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && value.length >= 11) {
      toast.error('Max assignment type name length is 12', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: toast.Bounce,
      });
    } else if (name === 'weight' && value.length >= 4) {
      toast.error('Cannot have 4 digit weights', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: toast.Bounce,
      });
    } else {
      updateAssignmentType(at.id, name, name === 'weight' ? formatFloat(value, 2) : value);
    }
  };

  const toggleLock = async () => {
    setLocked(!locked);
    updateAssignmentType(id, 'lock_weights', !locked);
    if (!isGuest) {
      await patchData(`/assignment-types/${id}`, { lock_weights: !locked });
    }
  };

  const handleDelete = async () => {
    removeAssignmentType(id);
    if (!isGuest) {
      await destroyData(`/assignment-types/${id}`);
    }
  };

  const handleAddAssignment = async () => {
    if (at.assignments.length >= 15) {
      toast.error('Cannot have more then 15 assignments per assignment type', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: toast.Bounce,
      });
    } else {
      const newAssignment = {
        name: at.default_name,
        assignment_type: id,
        score: at.max_score,
        max_score: at.max_score,
      };
      if (!isGuest) {
        const response = await addData('/assignments/', newAssignment);
        addAssignment(id, response.data);
      } else {
        addAssignment(id, newAssignment);
      }
    }
  };

  const handleBlur = async (e) => {
    if (!isGuest) {
      const { name, value } = e.target;
      await patchData(`/assignment-types/${id}`, { [name]: value });
    }
  };

  return (
    <div className="my-16">
      <Accordion
        title={
          <input
            onFocus={handleFocus}
            name="name"
            value={at.name || ''}
            className="clickable-input w-[224px] border-none text-start"
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
            onBlur={handleBlur}
          />
        }
        open={openAccordian}
        setOpen={setOpenAccordian}
      />
      {openAccordian && (
        <div className="flex flex-col text-[48px] border-2 border-white py-8">
          <div className="px-10 flex items-center gap-4">
            <button
              className={`class-button text-white bg-green-600 hover:bg-green-700 active:bg-green-800`}
              onClick={handleAddAssignment}
            >
              <div className="flex flex-col justify-center items-center py-2 px-2">
                <AddCircleOutline />
                <p className="text-xs">New Assignment</p>
              </div>
            </button>
            <button
              className={`class-button text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800`}
              onClick={toggleLock}
            >
              <div className="flex flex-col justify-center items-center py-2 px-2">
                {locked ? <LockOpenRounded /> : <Lock />}
                <p className="text-xs">{locked ? 'Unlock Weights' : 'Lock Weights'}</p>
              </div>
            </button>
            <button
              className={`class-button text-white bg-red-600 hover:bg-red-700 active:bg-red-800`}
              onClick={handleDelete}
            >
              <div className="flex flex-col justify-center items-center py-2 px-2">
                <Delete />
                <p className="text-xs">Delete Assignment Type</p>
              </div>
            </button>
            <h1>|</h1>
            <h1 className="text-[32px]">
              Weight:
              {locked ? (
                <input
                  onFocus={handleFocus}
                  name="weight"
                  value={formatFloat(at.weight, 2)}
                  onChange={handleChange}
                  className="clickable-input w-[72px] text-center px-2"
                  onBlur={handleBlur}
                />
              ) : (
                <span className="px-2">{formatFloat(at.weight, 2)}</span>
              )}
            </h1>
            <h1>|</h1>
            <h1 className="text-[32px]">
              Weighted Score:{' '}
              <span className="text-[24px]">
                {formatFloat(at.total_score, 2)} / {formatFloat(at.max_total_score, 2)}
              </span>
            </h1>
            <h1>|</h1>
            <h1 className="text-[32px]">
              Lost Points: <span className="text-[24px]">{formatFloat(lostPoints, 2)}</span>
            </h1>
          </div>
          <div className="flex gap-20 items-center text-lg pt-8">
            <h1 className="w-[10%] px-6">Name</h1>
            <h1 className="w-[40%] text-center">Score</h1>
            <h1 className="w-8 text-center">Weight</h1>
            <h1 className="w-[12%] text-center">Weighted Score</h1>
            <h1 className="w-[12%] text-center">Lost Points</h1>
          </div>
          <hr className="my-6" />
          {at.assignments && at.assignments.map((a, i) => <Assignment key={i} atId={id} aIdx={i} />)}
        </div>
      )}
    </div>
  );
}

export default AssignmentType;
