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
              value="Z1"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z2"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z3"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z4"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z5"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z6"
            ></button>
          </div>
          <div className="row">
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z7"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z8"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z9"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z10"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z11"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z12"
            ></button>
          </div>
          <div className="row">
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z13"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z14"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z15"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z16"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z17"
            ></button>
            <button
              className="col pitchzone"
              onClick={(e) => updatePitchzone(e.target.value)}
              value="Z18"
            ></button>
          </div>
        </div>
      </div>
    </Modal.Body>
  );
}
