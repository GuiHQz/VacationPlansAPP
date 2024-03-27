import "./style.css";
import { ChangeEvent, FormEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { post } from "../../services/apiClient";
import { Modal } from "../../components/Modal/Modal";

const AddHolidayPlans = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    participants: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const participantsArray = formData.participants
        .split(",")
        .map((participant) => participant.trim());

      const updatedFormData = {
        id: uuidv4(),
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        participants: participantsArray,
      };

      await post(updatedFormData);
    } catch (err) {
      console.log("Erro ao adicionar plano de férias: ", err);
    }

    navigate("/");
  };

  const onCancelButton = (e: FormEvent) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const onCancelModal = () => {
    setIsModalVisible(false);
  };

  const onConfirmModal = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      date: "",
      location: "",
      participants: "",
    });
    navigate("/");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <Modal
        title="Você gostaria de cancelar essa ação?"
        isVisible={isModalVisible}
        onCancel={onCancelModal}
        onConfirm={onConfirmModal}
      />
      <h3>Adicione um novo Plano de Férias</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <span className="title-input">Titulo: *</span>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            maxLength={22}
            placeholder="Viagem de Natal | (Máximo caracteres: 22)"
          />
        </label>
        <label htmlFor="description">
          <span className="title-input">Descrição:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Visitar as praias, comprar lembranças para a família"
          />
        </label>
        <label htmlFor="date">
          <span className="title-input">Data: *</span>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="location">
          <span className="title-input">Local: *</span>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            maxLength={15}
            placeholder="Los Angeles"
          />
        </label>
        <label htmlFor="participants">
          <span className="title-input">Participantes: *</span>
          <input
            type="text"
            name="participants"
            required
            value={formData.participants}
            onChange={handleChange}
            placeholder="Guilherme, Glória, Matias, Sarah"
          />
        </label>
        <div className="button-area">
          <button
            className="button-cancel-plan"
            onClick={onCancelButton}
            type="submit"
          >
            CANCELAR
          </button>
          <button className="button-add-plan" type="submit">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHolidayPlans;
