import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function AlertModal({ basicModal, toggleOpen, title, text, onConfirm }) {
  return (
    <MDBModal open={basicModal} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle className="overTitle">{title}</MDBModalTitle>
          </MDBModalHeader>
          <MDBModalBody>{text}</MDBModalBody>
          <MDBModalFooter>
            <button className="custom-btn custom-btn__soft" onClick={toggleOpen}>
              Cancelar
            </button>
            <button className="custom-btn" onClick={onConfirm}>Confirmar</button>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export default AlertModal;
