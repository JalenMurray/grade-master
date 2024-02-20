function NavIcon({ icon, txt, link }) {
  return (
    <div className="rounded-full cursor-pointer justify-center items-center text-center">
      <a href={link}>{icon}</a>
      {txt && <h5 className="pt-1">{txt}</h5>}
    </div>
  );
}

export default NavIcon;
