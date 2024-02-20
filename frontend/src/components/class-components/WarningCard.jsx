import { Error } from '@mui/icons-material';

function WarningCard({ warning }) {
  return (
    <div
      className={`h-[100px] w-[256px] bg-${warning.bg} text-white rounded-xl flex justify-center items-center text-center`}
    >
      <div className="p-2 flex justify-center items-center text-center">
        <Error />
        <p className="px-2">{warning.txt}</p>
      </div>
    </div>
  );
}

export default WarningCard;
