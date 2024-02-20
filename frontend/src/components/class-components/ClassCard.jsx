import { useNavigate } from 'react-router-dom';
import { formatFloat } from '../../utils/utils';

function ClassCard({ cls }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col border-2 border-white w-1/3 rounded-xl text-center items-center justify-center h-[256px] cursor-pointer hover:bg-gray-950 active:bg-gray-900 text-3xl"
      onClick={() => navigate(`/class/${cls.id}`)}
    >
      <h1>
        {cls.code} {cls.title}
      </h1>
      <h5>Score: {formatFloat(cls.score, 2)}</h5>
    </div>
  );
}

export default ClassCard;
