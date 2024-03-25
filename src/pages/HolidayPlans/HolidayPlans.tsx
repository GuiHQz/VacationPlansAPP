import "./style.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CiFileOff } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiPencilSimpleDuotone } from "react-icons/pi";

import { Modal } from "../../components/Modal/Modal";
import { HolidayPlanTypes } from "../../types/types";
import { Button } from "../../components/Button/Button";
import { deleteHolidayPlan } from "../../services/apiClient";

export const HolidayPlans = () => {
  const [holidayPlans, setHolidayPlans] = useState<HolidayPlanTypes[]>([]);
  const [isExpanded, setIsExpanded] = useState<Number | String | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>();

  const toggleExpanded = (planId: number | string) => {
    setIsExpanded((prevId) => (prevId === planId ? null : planId));
  };

  const navigate = useNavigate();

  const addHolidayPlan = () => {
    navigate("/add");
  };

  const handleDeletePlan = () => {
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
    fetch("http://localhost:3000/api/holiday-plans")
      .then((response) => response.json())
      .then((data) => setHolidayPlans(data))
      .catch((error) => console.error("Error fetching holiday plans:", error));
  }, []);

  return (
    <div className="container">
      <h2 className="title">Lista de Planos de Férias</h2>
      {holidayPlans.length === 0 ? (
        <div className="no-vacation-plans">
          <h2>Oops... não encontramos nenhum plano de férias no momento</h2>
          <CiFileOff size={100} />
        </div>
      ) : (
        holidayPlans.map((plan) => (
          <ul key={plan.id}>
            <Modal
              title="Você deseja deletar esse plano?"
              isVisible={isModalVisible}
              onCancel={cancelButtonModal}
              onConfirm={() => confirmButtonModal(plan.id)}
            />
            <li className="plan" onClick={() => toggleExpanded(plan.id)}>
              <button className="detail-title">
                <span>{plan.title}</span>
                <div className="buttons-icon">
                  <div
                    className="button-icon__delete"
                    onClick={handleDeletePlan}
                  >
                    <FaRegTrashAlt style={{ backgroundColor: "transparent" }} />
                  </div>
                  <div className="button-icon__edit">
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
                  <button className="detail">
                    <strong>Descrição:</strong> <span>{plan.description}</span>
                  </button>
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
