import "./style.css";

interface ModalProps {
  /**
   * Texto que irá perguntar ao usuário se ele deseja realmente tomar a decisão dele.
   */
  title?: string;
  /**
   * Lógica responsável por decidir se o Modal estará ou não visível para o usuário.
   */
  isVisible?: boolean;
  /**
   * Função responsável na criação da lógica para o botão de cancelar/não.
   */
  onCancel?: () => void;
  /**
   * Função responsável na criação da lógica para o botão de confirmar/sim.
   */
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
              <button className="onCancel" onClick={onCancel}>
                NÃO
              </button>
              <button className="onConfirm" onClick={onConfirm}>
                SIM
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
