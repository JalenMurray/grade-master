import { useContext, useEffect, useState } from 'react';
import { ClassContext } from '../../../contexts/class';
import VModal from '../../VModal';
import ModalForm from '../../ModalForm';
import { patchData } from '../../../utils/api';

function EditClassModal({ open, setOpen }) {
  const { cls, updateClass } = useContext(ClassContext);
  const [formFields, setFormFields] = useState({});

  useEffect(() => {
    setFormFields({
      code: cls.code,
      title: cls.title,
      desired_score: cls.desired_score,
      units: cls.units,
    });
  }, [cls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    updateClass({ [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await patchData(`/classes/${cls.id}`, formFields);
    setOpen(false);
  };

  return (
    <VModal
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="custom-modal"
      header={'Edit Class'}
      body={
        <ModalForm
          onSubmit={handleEdit}
          formData={[
            { label: 'Code', name: 'code', value: formFields.code, onChange: handleChange },
            { label: 'Title', name: 'title', value: formFields.title, onChange: handleChange },
            { label: 'Desired Score', name: 'desired_score', value: formFields.desired_score, onChange: handleChange },
            { label: 'Units/Credits', name: 'units', value: formFields.units, onChange: handleChange },
          ]}
        />
      }
    />
  );
}

export default EditClassModal;
