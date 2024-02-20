import VModal from '../../VModal';
import ModalForm from '../../ModalForm';
import { useState } from 'react';
import { showErrorToast } from '../../../utils/utils';
import { addData } from '../../../utils/api';

function AddClassModal({ open, setOpen, semester }) {
  const [formFields, setFormFields] = useState({
    code: '',
    title: '',
    desired_score: 0,
    units: 0,
  });

  const handleEditForm = (e) => {
    const { name, value } = e.target;
    if (name === 'code' && value.length > 16) {
      showErrorToast('A class code cannot be more than 16 characters');
    } else if (name === 'title' && value.length > 64) {
      showErrorToast('A class title cannot be more than 64 characters');
    } else if (name === 'desired_score' && value > 100) {
      showErrorToast('The desired score for a class cannot be more than 100');
    } else if (name === 'desired_score' && isNaN(value)) {
      showErrorToast('Desired score can only be a number');
    } else if (name === 'units' && isNaN(value)) {
      showErrorToast('Units can only be a number');
    } else {
      setFormFields({ ...formFields, [name]: value });
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (semester.classes.length >= 8) {
      showErrorToast('You have reached the max amount of classes for this semester');
    } else if (!formFields.units || parseFloat(formFields.units) <= 0) {
      showErrorToast('Units must be 1 or more. If you do not know, enter 1');
    } else {
      const newClass = { ...formFields, semester: semester.id };
      await addData('/classes/', newClass);
      window.location.reload();
    }
  };

  return (
    <VModal
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="custom-modal"
      header={'Create New Class'}
      body={
        <ModalForm
          onSubmit={handleAddClass}
          formData={[
            { label: 'Code', name: 'code', value: formFields.code, onChange: handleEditForm },
            { label: 'Title', name: 'title', value: formFields.title, onChange: handleEditForm },
            {
              label: 'Desired Score',
              name: 'desired_score',
              value: formFields.desired_score,
              onChange: handleEditForm,
            },
            { label: 'Units/Credits', name: 'units', value: formFields.units, onChange: handleEditForm },
          ]}
        />
      }
    />
  );
}

export default AddClassModal;
