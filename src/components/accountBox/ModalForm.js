import React from 'react'
import { Modal, Button } from "react-bootstrap";

const ModalForm = ( {show, success, title, message, hide} ) => {
    return (
        <>
            <Modal show={show} centered>
                <Modal.Header className="m-0 p-0">
                    <Modal.Title className={`alert ${success ? 'alert-success bg-success' : 'alert-danger bg-danger'} w-100 text-white`}>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant={success ? 'success' : 'danger'} onClick={hide}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalForm
