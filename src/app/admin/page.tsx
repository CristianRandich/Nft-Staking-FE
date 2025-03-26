import React from "react";
import "./admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard"> 
      <h1 className="admin-dashboard__title">Panel de Administración - NFT Staking</h1>

      <section className="admin-dashboard__metrics">
        <div className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">NFTs en Staking</h3>
          {/* TODO: Reemplazar con valor dinámico desde la blockchain */}
          <p className="admin-dashboard__card-value">0</p>
        </div>
        <div className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Staking 1 Año</h3>
          {/* TODO: Obtener cantidad de NFTs con stake a 1 año */}
          <p className="admin-dashboard__card-value">0</p>
        </div>
        <div className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Staking 2 Años</h3>
          {/* TODO: Obtener cantidad de NFTs con stake a 2 años */}
          <p className="admin-dashboard__card-value">0</p>
        </div>
        <div className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Wallets Únicas</h3>
          {/* TODO: Calcular número de wallets únicas con NFTs en staking */}
          <p className="admin-dashboard__card-value">0</p>
        </div>
        <div className="admin-dashboard__card admin-dashboard__card--full">
          <h3 className="admin-dashboard__card-title">Recompensas Distribuidas</h3>
          {/* TODO: Mostrar contador en vivo de recompensas distribuidas */}
          <p className="admin-dashboard__card-value admin-dashboard__card-value--green">0.00 TOKEN</p>
        </div>
      </section>

      {/* 🔧 Se añadió este contenedor para agrupar las dos secciones lateralmente */}
      <div className="admin-dashboard__section-wrapper">
        <section className="admin-dashboard__section">
          <h2 className="admin-dashboard__section-title">Cambiar Tasa de Recompensa</h2>
          {/* TODO: Vincular input a estado y enviar transacción para actualizar tasa */}
          <div className="admin-dashboard__input-group">
            <input type="number" className="admin-dashboard__input" placeholder="Nueva tasa de recompensa" />
            <button className="admin-dashboard__button">Actualizar</button>
          </div>
        </section>

        <section className="admin-dashboard__section">
          <h2 className="admin-dashboard__section-title">Snapshots de Usuarios</h2>
          <p>Genera una instantánea de los usuarios que tienen NFTs en staking.</p>
          <div className="admin-dashboard__button-group">
            {/* TODO: Implementar lógica para tomar snapshot desde la blockchain */}
            <button className="admin-dashboard__button">Tomar Snapshot</button>
            {/* TODO: Descargar snapshot en formato CSV */}
            <button className="admin-dashboard__button admin-dashboard__button--outline">Descargar CSV</button>
            {/* TODO: Descargar snapshot en formato JSON */}
            <button className="admin-dashboard__button admin-dashboard__button--outline">Descargar JSON</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
