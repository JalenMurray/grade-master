import { MoreVertRounded } from '@mui/icons-material';
import { useRef, useState, useEffect } from 'react';

function Dropdown({ children, ...otherProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const closeDropDownOnOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropDownOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeDropDownOnOutsideClick);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <MoreVertRounded onClick={toggleDropdown} {...otherProps} fontSize="" />
      {isOpen && (
        <div className="mt-3 flex flex-col absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-black cursor-pointer bg-white rounded-[20px] overflow-hidden w-[170px] text-center text-[16px]">
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
