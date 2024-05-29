import "./style.css";

import { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { CiFileOff } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiPencilSimpleDuotone } from "react-icons/pi";

import { Modal } from "../../components/Modal/Modal";
import { HolidayPlanTypes } from "../../types/types";
import { Button } from "../../components/Button/Button";
import { deleteHolidayPlan } from "../../services/apiClient";

const HolidayPlans = () => {
  const [holidayPlans, setHolidayPlans] = useState<HolidayPlanTypes[]>([]);
  const [isExpanded, setIsExpanded] = useState<Number | String | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>();

  const toggleExpanded = (planId: number | string) => {
    setIsExpanded((prevId) => (prevId === planId ? null : planId));
  };

  const navigate = useNavigate();

  const addHolidayPlan = () => {
    navigate("/add");
  };

  const handleDeletePlan =
    (plandId: string) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setSelectedPlan(plandId);
      setIsModalVisible(true);
    };

  const cancelButtonModal = () => {
    setIsModalVisible(false);
  };

  const confirmButtonModal = async (id: string) => {
    try {
      await deleteHolidayPlan(id);
      const updatedHolidayPlans = holidayPlans.filter((plan) => plan.id !== id);
      setHolidayPlans(updatedHolidayPlans);
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/holiday-plans`)
      .then((response) => response.json())
      .then((data) => setHolidayPlans(data))
      .catch((error) => console.error("Error fetching holiday plans:", error));
  }, []);

  return (
    <div className="container">
      <h2 className="title">Lista de Planos de Férias</h2>
      {holidayPlans.length === 0 ? (
        <div className="no-vacation-plans">
          <h2>
            Ops, não encontramos nenhum plano de férias. Que tal elaborar seu
            próximo plano?
          </h2>
          <CiFileOff size={100} />
        </div>
      ) : (
        holidayPlans.map((plan) => (
          <ul key={plan.id}>
            <Modal
              title="Você gostaria de deletar esse plano?"
              isVisible={isModalVisible}
              onCancel={cancelButtonModal}
              onConfirm={() => {
                if (selectedPlan) confirmButtonModal(selectedPlan);
              }}
            />
            <li className="plan" onClick={() => toggleExpanded(plan.id)}>
              <button className="detail-title">
                <span>{plan.title}</span>
                <div className="buttons-icon">
                  <div
                    className="button-icon__delete"
                    onClick={handleDeletePlan(plan.id)}
                  >
                    <FaRegTrashAlt style={{ backgroundColor: "transparent" }} />
                  </div>
                  <div
                    className="button-icon__edit"
                    onClick={() => navigate(`/edit/${plan.id}`)}
                  >
                    <PiPencilSimpleDuotone
                      style={{
                        backgroundColor: "transparent",
                        marginLeft: "10px",
                      }}
                    />
                  </div>
                </div>
              </button>
              {isExpanded === plan.id && (
                <div className="details">
                  {plan.description && (
                    <button className="detail">
                      <strong>Descrição:</strong>{" "}
                      <span>{plan.description}</span>
                    </button>
                  )}
                  <button className="detail">
                    <strong>Data:</strong> <span>{plan.date}</span>
                  </button>
                  <button className="detail">
                    <strong>Local:</strong> <span>{plan.location}</span>
                  </button>
                  <button className="detail">
                    <strong>Participantes:</strong>{" "}
                    <span>{plan.participants.join(", ")}</span>
                  </button>
                </div>
              )}
            </li>
          </ul>
        ))
      )}
      <div className="button-add">
        <Button onClick={addHolidayPlan} />
      </div>
    </div>
  );
};

export default HolidayPlans;
