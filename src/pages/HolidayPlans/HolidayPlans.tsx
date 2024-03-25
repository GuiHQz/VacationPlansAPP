import "./style.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HolidayPlanTypes } from "../../types/types";
import { Button } from "../../components/Button/Button";

import { CiFileOff } from "react-icons/ci";
import { PiPencilSimpleDuotone } from "react-icons/pi";

export const HolidayPlans = () => {
  const [isExpanded, setIsExpanded] = useState<Number | String | null>(null);
  const [holidayPlans, setHolidayPlans] = useState<HolidayPlanTypes[]>([]);

  const toggleExpanded = (planId: number | string) => {
    setIsExpanded((prevId) => (prevId === planId ? null : planId));
  };

  const navigate = useNavigate();

  const addHolidayPlan = () => {
    navigate("/add");
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
            <li className="plan" onClick={() => toggleExpanded(plan.id)}>
              <button className="detail-title">
                <div>
                  <span>{plan.title}</span>
                </div>
                <div className="button-edit">
                  <PiPencilSimpleDuotone
                    style={{ backgroundColor: "transparent" }}
                  />
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
