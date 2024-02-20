import { Modal } from 'react-bootstrap';

const VModal = ({ header, body, ...otherProps }) => {
  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...otherProps}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
};

export default VModal;
