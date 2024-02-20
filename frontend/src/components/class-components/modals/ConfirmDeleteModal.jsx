import { useNavigate } from 'react-router-dom';
import { destroyData } from '../../../utils/api';
import VModal from '../../VModal';

function ConfirmDeleteModal({ open, setOpen, msg, url, toLink }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await destroyData(url);
    if (response.success) {
      navigate(toLink);
    }
  };

  return (
    <VModal
      show={open}
      onHide={() => setOpen(false)}
      header={'Confirm Delete'}
      body={
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">{msg}</h1>
          <div className="flex gap-4">
            <button
              className="py-2 px-2 rounded-lg text-white bg-red-500 hover:bg-red-600 active:bg-red-700"
              onClick={handleDelete}
            >
              Confirm Deletion
            </button>
            <button
              className="py-2 px-2 rounded-lg text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              Cancel Deletion
            </button>
          </div>
        </div>
      }
    />
  );
}

export default ConfirmDeleteModal;
