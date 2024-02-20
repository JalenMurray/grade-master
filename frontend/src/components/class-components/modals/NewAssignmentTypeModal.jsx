import { useContext, useState } from 'react';
import VModal from '../../VModal';
import { ClassContext } from '../../../contexts/class';
import ModalForm from '../../ModalForm';
import { addData } from '../../../utils/api';
import { toast } from 'react-toastify';

function NewAssignmentTypeModal({ open, setOpen, cls }) {
  const { assignmentTypes, addAssignmentType, isGuest } = useContext(ClassContext);
  const [formFields, setFormFields] = useState({
    name: '',
    max_score: 100,
    weight: 0,
    default_name: '',
    lock_weights: false,
  });

  const handleEditForm = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (Object.values(assignmentTypes).length >= 15) {
      toast.error('You have reached the max amount of Assignment Types for this class', {
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
      const newAt = { ...formFields, associated_class: cls, lock_weights: false };
      if (!isGuest) {
        const response = await addData('/assignment-types/', newAt);
        addAssignmentType(response.data);
      } else {
        let highestId = 0;
        Object.values(assignmentTypes).forEach((at) => {
          if (at.id > highestId) {
            highestId = at.id;
          }
        });
        highestId += 1;
        console.log('NEW ID', highestId);
        const data = { ...newAt, assignments: [], id: highestId };
        addAssignmentType(data);
      }
    }
    setOpen(false);
  };

  return (
    <VModal
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="custom-modal"
      header={'Create New Assignment Type'}
      body={
        <ModalForm
          onSubmit={handleAdd}
          formData={[
            { label: 'Name', name: 'name', value: formFields.name, onChange: handleEditForm },
            { label: 'Default Name', name: 'default_name', value: formFields.default_name, onChange: handleEditForm },
            { label: 'Max Score', name: 'max_score', value: formFields.max_score, onChange: handleEditForm },
            { label: 'Weight', name: 'weight', value: formFields.weight, onChange: handleEditForm },
          ]}
        />
      }
    />
  );
}

export default NewAssignmentTypeModal;
