import { formatFloat } from '../../utils/utils';
import { toast } from 'react-toastify';

import { Delete } from '@mui/icons-material';
import ClassButton from './ClassButton';
import { useContext, useEffect, useState } from 'react';
import { ClassContext } from '../../contexts/class';
import { destroyData, patchData } from '../../utils/api';

function Assignment({ atId, aIdx }) {
  const { assignmentTypes, updateAssignment, removeAssignment, isGuest } = useContext(ClassContext);
  const [assignment, setAssignment] = useState(assignmentTypes[atId].assignments[aIdx]);
  const [locked, setLocked] = useState(assignmentTypes[atId].lock_weights);
  const [weightedScore, setWeightedScore] = useState(0);
  const [lostPoints, setLostPoints] = useState(0);

  useEffect(() => {
    setAssignment(assignmentTypes[atId].assignments[aIdx]);
    setLocked(assignmentTypes[atId].lock_weights);
  }, [assignmentTypes]);

  useEffect(() => {
    if (!assignment.max_score) {
      setWeightedScore(0);
    } else {
      const scorePercent = assignment.score / assignment.max_score;
      const newWeighted = scorePercent * assignment.weight;
      setWeightedScore(newWeighted);
      setLostPoints(assignment.weight - newWeighted);
    }
  }, [assignment]);

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'name' && value.length >= 20) {
      toast.error('Max length for assignment name is 20', {
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
    } else if ((name === 'score' || name === 'max_score') && value.length >= 6) {
      toast.error('Cannot have 6 digit scores', {
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
      if (name !== 'name') {
        value = formatFloat(value, 2);
      }
      updateAssignment(atId, aIdx, name, value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleDelete = async () => {
    removeAssignment(atId, aIdx);
    if (!isGuest) {
      await destroyData(`/assignments/${assignment.id}`);
    }
  };

  const handleBlur = async (e) => {
    if (!isGuest) {
      const { name, value } = e.target;
      await patchData(`/assignments/${assignment.id}`, { [name]: value });
    }
  };

  return (
    <div className="flex gap-20 my-2 text-[24px] items-center px-4">
      <input
        onFocus={handleFocus}
        name="name"
        value={assignment.name}
        onChange={handleChange}
        className="clickable-input w-[10%] text-start"
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
      />
      <div className="flex w-[40%] justify-center">
        <input
          onFocus={handleFocus}
          type="number"
          name="score"
          value={assignment.score}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="clickable-input"
          onBlur={handleBlur}
        />
        <p className="mx-5">/</p>
        <input
          onFocus={handleFocus}
          type="number"
          name="max_score"
          value={assignment.max_score}
          onChange={handleChange}
          className="clickable-input"
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
        />
      </div>
      {locked && <h5 className="text-white w-12 text-center">{formatFloat(assignment.weight, 2)}</h5>}
      {!locked && (
        <input
          onFocus={handleFocus}
          type="number"
          name="weight"
          value={formatFloat(assignment.weight, 2)}
          onChange={handleChange}
          className="clickable-input w-12 text-center"
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
        />
      )}

      <h5 className="text-white text-center w-[12%]">{formatFloat(weightedScore, 2)}</h5>
      <h5 className="text-white text-center w-[12%]">{formatFloat(lostPoints, 2)}</h5>
      <ClassButton
        icon={<Delete />}
        otherClasses={'w-14 bg-red-600 hover:bg-red-700 active:bg-red-800'}
        txt={'Delete'}
        onClick={handleDelete}
      />
    </div>
  );
}

export default Assignment;
