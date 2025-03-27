import React from "react";
import "./rewards.css";

// Este array se reemplazará por datos dinámicos desde la blockchain o backend
const rewards = [
  {
    id: 1,
    name: "Token Airdrop",
    type: "SPL Token",
    amount: "25 XYZ",
    status: "disponible",
    claimed: false,
  },
  {
    id: 2,
    name: "Participation Bonus",
    type: "SPL Token",
    amount: "50 ABC",
    status: "reclamado",
    claimed: false,
  },
];

export default function Page() {
  return (
    <div className="rewards">
      <h1 className="rewards__title">Rewards Panel</h1>
      <div className="rewards__cards">
        {rewards.map((reward) => (
          <div key={reward.id} className="rewards__card">
            <div className="rewards__card-header">
              <h2 className="rewards__card-title">{reward.name}</h2>
              <span className="rewards__token-type">{reward.type}</span>
            </div>
            <div className="rewards__card-details">
              <p className="rewards__card-line">
                <strong>Monto:</strong> {reward.amount}
              </p>
              <p className="rewards__card-line">
                <strong>Estado:</strong>{" "}
                <span
                  className={
                    reward.claimed
                      ? "rewards__status rewards__status--claimed"
                      : "rewards__status rewards__status--available"
                  }
                >
                  {reward.status}
                </span>
              </p>
            </div>
            {/* Aquí se añadirá lógica para manejar la acción on-chain al reclamar SPL tokens */}
            <button className="rewards__claim-btn" disabled={reward.claimed}>
              {reward.claimed ? "Reclamado" : "Reclamar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
