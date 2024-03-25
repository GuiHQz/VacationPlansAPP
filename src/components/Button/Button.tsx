import "./style.css";

interface ButtonProps {
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ 
  /**
   * Função que será disparada quando o usuário clicar no botão
   */
  onClick 
}) => {
  return (
    <>
      <button onClick={onClick} className="button">+</button>
    </>
  );
};
