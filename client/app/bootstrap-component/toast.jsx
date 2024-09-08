
import { Toast, ToastContainer } from 'react-bootstrap';

 const ToastMessage = ({ show, onClose , text}) => (
    <ToastContainer position="top-end" className="p-3">
        <Toast bg='danger' show={show} onClose={onClose} delay={2000} autohide>
            <Toast.Body className="text-white">{text}</Toast.Body>
        </Toast>
    </ToastContainer>
);

export default ToastMessage;
