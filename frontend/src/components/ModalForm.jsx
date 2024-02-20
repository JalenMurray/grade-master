import { useState, useEffect } from 'react';

function ModalForm({ formData, onSubmit }) {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    setFormFields(formData);
  }, [formData]);

  const handleChangeBase = (e, handleChange, i) => {
    if (handleChange) {
      return handleChange(e);
    }
    const { value } = e.target;
    const newFormFields = formFields.map((field, j) => {
      if (i === j) {
        return { ...field, value: value };
      }
      return field;
    });
    setFormFields(newFormFields);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {formFields.map((field, i) => {
          const { label, name, value, onChange, ...otherProps } = field;
          return (
            <div key={i} className="flex flex-col gap-2">
              <label>{label}</label>
              <input
                className="border-[1px] border-black rounded-lg p-2"
                name={name}
                value={value}
                onChange={(e) => handleChangeBase(e, onChange, i)}
                {...otherProps}
              />
            </div>
          );
        })}
        <button
          className="text-white border-[1px] border-black py-2 px-2 rounded-lg bg-green-700 hover:bg-green-800 active:bg-green-900 w-48 my-2"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ModalForm;
