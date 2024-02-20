import WarningCard from './WarningCard';

function Warnings({ warnings }) {
  return (
    <div className="w-4/5 h-fit mx-auto text-white my-4">
      {warnings && Object.values(warnings).map((warning, i) => <WarningCard key={i} warning={warning} />)}
    </div>
  );
}

export default Warnings;
