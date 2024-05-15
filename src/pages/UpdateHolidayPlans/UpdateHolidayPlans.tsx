import "./style.css";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Modal } from "../../components/Modal/Modal";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchHolidayPlanById,
  updateHolidayPlan,
} from "../../services/apiClient";

const UpdateHolidayPlans = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    participants: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPlan = async () => {
        try {
          const planDetails = await fetchHolidayPlanById(id);
          setPlan(planDetails);
        } catch (error) {
          console.error("Erro ao buscar os dados do plano de férias: ", error);
        }
      };

      fetchPlan();
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPlan({
      ...plan,
      [name]: value,
    });
  };

  const onCancelButton = (e: FormEvent) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const onCancelModal = () => {
    setIsModalVisible(false);
  };

  const onConfirmModal = () => {
    navigate("/");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const participantsArray = typeof plan.participants === 'string' ? 
        plan.participants.split(",").map((participant) => participant.trim()) : 
        [];

      const updatedplan = {
        title: plan.title,
        description: plan.description,
        date: plan.date,
        location: plan.location,
        participants: participantsArray.length > 0 ? participantsArray : plan.participants,
      };

      await updateHolidayPlan(plan.id, updatedplan);
    } catch (err) {
      console.log("Erro ao atualizar plano de férias: ", err);
    }

    navigate("/");
  };

  return (
    <>
      <Modal
        title="Você gostaria de descartar as mudanças do seu plano?"
        isVisible={isModalVisible}
        onCancel={onCancelModal}
        onConfirm={onConfirmModal}
      />
      <div className="container">
        <h3>Edite seu plano de férias</h3>
        {plan && (
          <div className="form-area">
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">
                <span className="title-input">Titulo: *</span>
                <input
                  type="text"
                  name="title"
                  required
                  value={plan.title}
                  onChange={handleChange}
                  maxLength={22}
                />
              </label>
              <label htmlFor="description">
                <span className="title-input">Descrição:</span>
                <textarea
                  name="description"
                  value={plan.description}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="date">
                <span className="title-input">Data: *</span>
                <input
                  type="date"
                  name="date"
                  required
                  value={plan.date}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="location">
                <span className="title-input">Local: *</span>
                <input
                  type="text"
                  name="location"
                  required
                  value={plan.location}
                  onChange={handleChange}
                  maxLength={15}
                />
              </label>
              <label htmlFor="participants">
                <span className="title-input">Participantes: *</span>
                <input
                  type="text"
                  name="participants"
                  required
                  value={plan.participants}
                  onChange={handleChange}
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
                  MUDAR
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateHolidayPlans;
