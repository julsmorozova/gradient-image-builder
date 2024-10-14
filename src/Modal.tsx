import { forwardRef, useState } from "react";
import { GradientObjectAction } from "./store";
import "./Modal.css";

type ModalProps = {
  title: string;
  layerId: string;
  onCancel: () => void;
  onSave: GradientObjectAction["addGroup"];
};
export const Modal = forwardRef(
  (
    { title, layerId, onSave, onCancel }: ModalProps,
    ref: React.ForwardedRef<HTMLDivElement | null>
  ) => {
    const [input, setInput] = useState("");
    const handleConfirm = () => {
      onSave(layerId, input);
      onCancel();
    };
    return (
      <div ref={ref} className="modal">
        <h3>{title}</h3>
        <div className="input-decoration">
          <input
            className="modal-input"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          ></input>
        </div>
        <div className="modal-buttons-wrapper">
          <button
            className="btn btn-secondary btn-modal"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-secondary btn-modal primary"
            type="button"
            disabled={!input}
            onClick={handleConfirm}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
);
