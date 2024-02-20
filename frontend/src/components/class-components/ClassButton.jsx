function ClassButton({ icon, otherClasses, txt, ...otherProps }) {
  return (
    <button className={`class-button ${otherClasses}`} {...otherProps}>
      <div>
        {icon}
        <p className="text-xs">{txt}</p>
      </div>
    </button>
  );
}

export default ClassButton;
