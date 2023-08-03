import React from "react";
import Button from "../Button/Button";
import "./Modal.scss";

const Modal = ({ children, onCloseModal, onAccept, show }) => {
    return (
        show && (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    {children}
                    <div className="me-0 ms-auto">
                        <Button onClick={onAccept} className="btn-primary me-2">
                            <span data-testid="modal-btn-ok">OK</span>
                        </Button>
                        <Button onClick={onCloseModal} className="btn-danger">
                            <span data-testid="modal-btn-cancel">Cancel</span>
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;
