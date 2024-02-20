import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function Accordion({ title, open, setOpen }) {
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full h-24 items-center border-2 border-white flex cursor-pointer" onClick={handleToggle}>
      <div className="flex gap-20 items-center text-[40px] w-full p-3">
        <div className="flex gap-4 w-[10%] items-center">{title}</div>
        <div className="flex gap-4 w-[40%] items-center" id="spacer"></div>
        {!open && <KeyboardArrowDown className="ml-auto text-[32px] cursor-pointer mr-8" fontSize="" />}
        {open && <KeyboardArrowUp className="ml-auto text-[32px] cursor-pointer mr-8" fontSize="" />}
      </div>
    </div>
  );
}

export default Accordion;
