import { Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SemesterCard({ semester }) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer border-2 border-white rounded-xl w-full p-4 flex gap-4 items-center hover:bg-gray-950 active:bg-gray-900"
      onClick={() => navigate(`/semester/${semester.id}`)}
    >
      <h1 className="text-[64px]">
        {semester.season} {semester.year}
      </h1>
      <span>{semester.current && <Star />}</span>
    </div>
  );
}

export default SemesterCard;
