import React from 'react'
import { Modal, Button } from "react-bootstrap";

const ModalForm = ({ show, success, title, message, hide, btn_close, type, delete:borrar }) => {
    return (
        <>
            <Modal show={show} centered onHide={hide} animation>
                <Modal.Header className="m-0 p-0" closeButton={btn_close}>
                    <Modal.Title className={`alert ${success ? 'alert-success bg-success' : 'alert-danger bg-danger'} w-100 text-white`}>
                        {title}
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    {type === 'delete' ? (
                        <>
                        <Button variant='danger' onClick={borrar}>
                            Sí
                        </Button>
                        <Button variant='danger' onClick={hide}>
                             No
                        </Button>
                        </>
                    ) :
                    (
                        <Button variant={success ? 'success' : 'danger'} onClick={hide}>
                            Cerrar
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalForm
