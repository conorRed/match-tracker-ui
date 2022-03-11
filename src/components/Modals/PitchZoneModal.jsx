import React from "react";
import { Modal, Button } from "react-bootstrap";
import pitch from "../../img/pitch.png";
export default function PitchZoneModal({ updatePitchzone }) {
  return (
    <Modal.Body>
      <img
        src={pitch}
        className="img-fluid"
        alt="Gaa pitch"
        width="100%"
        id="pitch-image"
      />
      <div className="overlay">
        <div className="container" style={{ height: 100 }}>
          <div className="row">
            <button
              className="col pitchzone"
              data-dismiss="modal"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Cornerback-Left"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Mid-Left"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="CornerForward-Left"
            ></button>
          </div>
          <div className="row">
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Fullback"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Center Field"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Fullforward"
            ></button>
          </div>
          <div className="row">
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="CornerForward-Right"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Mid-Right"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="CornerForward-Right"
            ></button>
          </div>
        </div>
      </div>
    </Modal.Body>
  );
}
