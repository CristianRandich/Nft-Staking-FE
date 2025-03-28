import React from "react";
import "./rewards.css";

// array para agregar datos desde el BE
const rewards = [
  {
    id: 1,
    name: "Token Airdrop",
    type: "SPL Token",
    amount: "25 XYZ",
    valueUsd: "12.34",
    status: "disponible",
    claimed: false,
    lastClaim: "2025-03-20",
  },
  {
    id: 2,
    name: "Participation Bonus",
    type: "SPL Token",
    amount: "50 ABC",
    valueUsd: "23.45",
    status: "reclamado",
    claimed: false,
    lastClaim: "2025-03-15",
  },
];

// Simulación de wallet conectada
const connectedWallet = ""; // agregar logica para de conexion de wallet

export default function Page() {
  return (
    <div className="rewards">
      <h1 className="rewards__title">Rewards Panel</h1>

      {/* Wallet conectada */}
      <div className="rewards__wallet">
      <span className="rewards__wallet-label">CONEXION WALLET</span>
      <span className="rewards__wallet-address"> {connectedWallet}</span>
      </div>

      <div className="rewards__cards">
        {rewards.map((reward) => (
          <div key={reward.id} className="rewards__card">
            <div className="rewards__card-header">
              <h2 className="rewards__card-title">{reward.name}</h2>
              <span className="rewards__token-type">{reward.type}</span>
            </div>
            <div className="rewards__card-details">
              <p className="rewards__card-line">
                <strong>Monto:</strong> {reward.amount} ≈ ${reward.valueUsd}
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
              <p className="rewards__card-line">
                <strong>Último Claim:</strong> {reward.lastClaim}
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

