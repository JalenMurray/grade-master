import VModal from '../../VModal';
// import ReactPlayer from 'react-player';
// import Carousel from '../../Carousel';
import Features from '../../Features';

// const features = [
//   {
//     label: 'Lock Weights',
//     description: 'Lock the weights of assignment types for dynamic weights on assignments',
//     showcase: (
//       <ReactPlayer url="/src/assets/LockWeightsFeatureTutorial.mp4" width="100%" height="auto" controls={true} />
//     ),
//   },
//   {
//     label: 'Feature Two',
//     description: 'Lock the weights of assignment types for dynamic weights on assignments',
//     showcase: <div className="bg-red-600 h-[300px] w-full">a</div>,
//   },
// ];

function FeaturesModal({ open, setOpen }) {
  return <VModal show={open} onHide={() => setOpen(false)} header={'Features'} body={<Features />} />;
}

export default FeaturesModal;
