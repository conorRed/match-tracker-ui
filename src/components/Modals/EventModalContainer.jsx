import React from "react";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function EventModalContainer({
  show,
  handleClose,
  submitEvent,
  children,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Define Event
          </Modal.Title>
        </Modal.Header>
        {children}
        <Modal.Footer>
          <Button onClick={submitEvent}>Finish</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
