import { ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function BackButton({ text }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div onClick={goBack} className="cursor-pointer w-fit">
      <h4 className="text-2xl text-slate-gray">
        <ChevronLeft />
        {text}
      </h4>
    </div>
  );
}

export default BackButton;
