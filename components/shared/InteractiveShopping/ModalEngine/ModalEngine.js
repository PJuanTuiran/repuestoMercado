import React from 'react';
import { Modal, Button } from "react-bootstrap";

function ModalEngine(props) {
    return (
        <div>
            <Button> Abrir Modal</Button>
            <Modal>
                <Modal.Header>
                    Modal Header
                </Modal.Header>
                <Modal.Body>
                    Cuerpo de la Modal
                </Modal.Body>
                <Modal.Footer>
                    Footer Modal
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEngine;