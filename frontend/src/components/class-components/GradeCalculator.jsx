import AssignmentType from './AssignmentType';
import { useContext } from 'react';
import { ClassContext } from '../../contexts/class';

function GradeCalculator({ guest }) {
  const { assignmentTypes } = useContext(ClassContext);

  return (
    <div className="text-white w-4/5 m-auto pt-10">
      {assignmentTypes &&
        Object.values(assignmentTypes).map((at) => <AssignmentType key={at.id} id={at.id} guest={guest} />)}
    </div>
  );
}

export default GradeCalculator;
