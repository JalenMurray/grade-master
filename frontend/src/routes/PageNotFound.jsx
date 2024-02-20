import Nav from '../components/Nav';

function PageNotFound() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen h-fit w-screen dark:bg-dark-bg py-6 flex text-center items-center justify-center">
        <h1 className="text-[48px] text-white">Page Not Found</h1>
      </div>
    </div>
  );
}

export default PageNotFound;
