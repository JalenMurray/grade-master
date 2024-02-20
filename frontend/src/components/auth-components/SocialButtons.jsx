import { Google, Facebook } from '@mui/icons-material';
import { useState } from 'react';

const getButtonType = (buttonType) =>
  ({
    google: Google,
    facebook: Facebook,
  }[buttonType]);

const SocialButton = ({ buttonType }) => {
  const CustomButton = getButtonType(buttonType);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="auth-button" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <CustomButton style={{ fontSize: '40px', color: hovered ? 'black' : 'white' }} />
    </div>
  );
};

function SocialButtons() {
  return (
    <div className="flex gap-4 justify-center my-3">
      <SocialButton buttonType={'google'} />
      <SocialButton buttonType={'facebook'} />
    </div>
  );
}

export default SocialButtons;
