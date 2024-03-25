import "./style.css";

interface ModalProps {
  title?: string;
  isVisible?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  isVisible,
  onCancel,
  onConfirm,
}) => {
  return (
    <>
      {isVisible && (
        <div className="main-container">
          <div className="modal">
            <h3>{title}</h3>
            <div className="buttons">
              <button onClick={onCancel}>NÃO</button>
              <button onClick={onConfirm}>SIM</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};