"use client";
import React from "react";

interface TransactionEntry {
  action: string;
  amount: number;
  timestamp: string;
}

interface RewardsDashboardProps {
  rewards: number;
  onClaim: () => void;
  history: TransactionEntry[];
}

export default function RewardsDashboard({
  rewards,
  onClaim,
  history,
}: RewardsDashboardProps) {
  return (
    <div className="rewardsContainer">
      <h2 className="rewardsTitle">Dashboard de Recompensas</h2>
      <p className="rewardsText">
        Recompensas Acumuladas: <strong>{rewards.toFixed(2)} Tokens</strong>
      </p>
      <button className="rewardsClaimBtn" onClick={onClaim}>
        Reclamar Recompensas
      </button>

      <h3 className="historyTitle">Historial de Transacciones</h3>
      {history.length === 0 ? (
        <p>No hay transacciones registradas.</p>
      ) : (
        <ul>
          {history.map((entry, idx) => (
            <li key={idx} className="historyItem">
              {entry.timestamp}: {entry.action} - {entry.amount} Tokens
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
