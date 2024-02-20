import { createContext, useEffect, useState } from 'react';

const EMPTY_CLASS = {
  code: '',
  title: '',
  semester: 1,
  desired_score: 100.0,
  units: 3,
  display_color: 'white',
  score: 100,
  semester_str: '',
  assignment_types: [],
};

export const ClassContext = createContext({
  cls: EMPTY_CLASS,
  setCls: () => null,
  assignmentTypes: null,
  setAssignmentTypes: () => null,
  warnings: null,
  setWarnings: () => null,
  isGuest: null,
  setIsGuest: () => null,
});

export const ClassProvider = ({ children }) => {
  const [cls, setCls] = useState(EMPTY_CLASS);
  const [assignmentTypes, setAssignmentTypes] = useState({});
  const [warnings, setWarnings] = useState({});
  const [isGuest, setIsGuest] = useState(false);

  // Class Updates
  useEffect(() => {
    const newScore = Object.values(assignmentTypes).reduce((acc, at) => {
      const { total_score } = getAtScores(at.assignments);
      return acc + total_score;
    }, 0);
    const toUpdate = { score: newScore };
    updateClass(toUpdate);

    // Warnings
    const totalWeight = Object.values(assignmentTypes).reduce((acc, at) => acc + at.weight, 0);
    if (totalWeight != 100) {
      setWarnings({ ...warnings, clsWeight: { txt: 'Total class weight does not equal 100%', bg: 'red-600' } });
    } else {
      if (Object.hasOwnProperty.call(warnings, 'clsWeight')) {
        // eslint-disable-next-line no-unused-vars
        let { clsWeight: removed, ...newWarnings } = warnings;
        setWarnings(newWarnings);
      }
    }
  }, [assignmentTypes]);

  const updateClass = (toUpdate) => {
    setCls({ ...cls, ...toUpdate });
  };

  // Assignment Type Updates

  /**
   *
   * Calculates the total and max total score for an assignment type
   * based on the updated assignments
   *
   * @param {Assignment[]} assignments array of assignments
   * @returns The new total and max total scores
   */
  const getAtScores = (assignments) => {
    if (!assignments) {
      return { total_score: 0, max_score: 0 };
    }
    const total_score = assignments.reduce((acc, a) => {
      return acc + (a.score / a.max_score) * a.weight;
    }, 0);
    const max_total_score = assignments.reduce((acc, a) => acc + a.weight, 0);
    return { total_score: total_score, max_total_score: max_total_score };
  };

  /**
   *
   *  Returns the weight for an assignment type.  Will return the weight associated if
   *  lock weights is enabled and will add the assignment weights if not.
   *
   * @param {AssignmentType} at AssignmentType
   * @param {Assignment[]} newAssignments updated Assignments for the assignment type
   * @returns {number} Calculated weight for the assignment type
   */
  const getAtWeight = (at, newAssignments) => {
    if (at.lock_weights) {
      return at.weight;
    }
    return newAssignments.reduce((acc, a) => acc + a.weight, 0);
  };

  /**
   *
   * Balances the weights of the provided assignments if assignment types requires it.
   * Balanced weights are where each assignment has an equal weight that adds up to the
   * desired total
   *
   * @param {AssignmentType} at AssignmentType associated with the assignments
   * @param {Assignment[]} assignments Assignments to be balanced
   * @param {number} weight (Optional) desired total weight
   * @returns {Assignment[]} lock_weights ? balanced assignments : provided assignments
   */
  const balanceWeights = (at, assignments, hardLock, weight) => {
    if (at.lock_weights || hardLock) {
      const numAssignments = assignments.length;
      let updatedWeight;
      if (weight) {
        updatedWeight = weight / numAssignments;
      } else {
        updatedWeight = at.weight / numAssignments;
      }
      const weightedAssignments = assignments.map((a) => ({ ...a, weight: updatedWeight }));
      return weightedAssignments;
    } else {
      return assignments;
    }
  };

  /**
   *
   * Processes updated assignment types to update all necessary external fields
   * And then updates the list of assignment types
   *
   * @param {number} id ID of assignment type assignments are associated with
   * @param {Assignment[]} assignments Updated Assignments
   */
  const updateAssignments = (id, assignments) => {
    const at = assignmentTypes[id];
    const balancedAssignments = balanceWeights(at, assignments, false);
    const atWeight = getAtWeight(at, balancedAssignments);
    const { total_score, max_total_score } = getAtScores(balancedAssignments);
    const updated = {
      ...at,
      assignments: balancedAssignments,
      total_score: total_score,
      max_total_score: max_total_score,
      weight: atWeight,
    };
    setAssignmentTypes({ ...assignmentTypes, [id]: updated });
  };

  const addAssignment = (id, assignment) => {
    updateAssignments(id, [...assignmentTypes[id].assignments, assignment]);
  };

  /**
   *
   * Removes Assignment from Assignment type and updates all relevant fields
   *
   * @param {number} id ID of the associated assignment type
   * @param {number} idx Index of the assignment that is to be removed in the array of assignments
   */
  const removeAssignment = (id, idx) => {
    const assignments = assignmentTypes[id].assignments;
    const updated = assignments.filter((_, i) => i != idx);
    updateAssignments(id, updated);
  };

  /**
   *
   * Updates a field of an assignment and updates all relevant fields as well
   *
   * @param {number} id ID of the associated assignment type
   * @param {number} idx Index of the assignment to be updated
   * @param {string} name Key of the field to update in the assignment object
   * @param {*} value New value of the $name field
   */
  const updateAssignment = (id, idx, name, value) => {
    const assignments = assignmentTypes[id].assignments;
    const assignment = assignments[idx];
    const updatedAssignment = { ...assignment, [name]: value };
    const updatedAssignments = assignments.map((a, i) => {
      if (i === idx) {
        return updatedAssignment;
      }
      return a;
    });
    updateAssignments(id, updatedAssignments);
  };

  const addAssignmentType = (newAt) => {
    const id = newAt.id;
    setAssignmentTypes({ ...assignmentTypes, [id]: newAt });
  };

  const removeAssignmentType = (id) => {
    // eslint-disable-next-line no-unused-vars
    const { [id]: removed, ...updated } = assignmentTypes;
    setAssignmentTypes(updated);
  };

  /**
   *
   * Updates a field in an assignment type and updates all relevant fields as well
   *
   * @param {number} id ID of the assignment type to be updated
   * @param {string} name Key of the field to be updated in the assignment type
   * @param {*} value New value of the $name field
   */
  const updateAssignmentType = (id, name, value) => {
    const at = assignmentTypes[id];
    let updated;
    if (name === 'weight') {
      const assignments = balanceWeights(at, at.assignments, false, value);
      const { total_score, max_total_score } = getAtScores(assignments);
      updated = {
        ...at,
        assignments: assignments,
        total_score: total_score,
        max_total_score: max_total_score,
        [name]: value,
      };
    } else if (name == 'lock_weights') {
      const assignments = balanceWeights(at, at.assignments, value);
      updated = { ...at, assignments: assignments, [name]: value };
    } else {
      updated = { ...at, [name]: value };
    }
    setAssignmentTypes({ ...assignmentTypes, [id]: updated });
  };

  const value = {
    cls,
    setCls,
    assignmentTypes,
    setAssignmentTypes,
    updateClass,
    addAssignmentType,
    removeAssignmentType,
    updateAssignmentType,
    addAssignment,
    removeAssignment,
    updateAssignment,
    warnings,
    isGuest,
    setIsGuest,
  };

  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
};
