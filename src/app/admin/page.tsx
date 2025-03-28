import React from "react";
import "./admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard"> 
      <h1 className="admin-dashboard__title">Panel de Administración - NFT Staking</h1>

      <section className="admin-dashboard__metrics">
        <div className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">NFTs en Staking</h3>
          <p className="admin-dashboard__card-value">0</p>
        </div>
        <div className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Staking 1 Año</h3>
          <p className="admin-dashboard__card-value">0</p>
        </div>
        <div className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Staking 2 Años</h3>
          <p className="admin-dashboard__card-value">0</p>
        </div>
        <div className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Wallets Únicas</h3>
          <p className="admin-dashboard__card-value">0</p>
        </div>
        <div className="admin-dashboard__card admin-dashboard__card--full">
          <h3 className="admin-dashboard__card-title">Recompensas Distribuidas</h3>
          <p className="admin-dashboard__card-value admin-dashboard__card-value--green">0.00 TOKEN</p>
        </div>
      </section>

      <div className="admin-dashboard__section-wrapper">
        <section className="admin-dashboard__section">
          <h2 className="admin-dashboard__section-title">Cambiar Tasa de Recompensa</h2>
          <div className="admin-dashboard__input-group">
            <input type="number" className="admin-dashboard__input" placeholder="Nueva tasa de recompensa" />
            <button className="admin-dashboard__button">Actualizar</button>
          </div>
        </section>

        <section className="admin-dashboard__section">
          <h2 className="admin-dashboard__section-title">Snapshots de Usuarios</h2>
          <p>Genera una instantánea de los usuarios que tienen NFTs en staking.</p>
          <div className="admin-dashboard__button-group">
            <button className="admin-dashboard__button">Tomar Snapshot</button>
            <button className="admin-dashboard__button admin-dashboard__button--outline">Descargar CSV</button>
            <button className="admin-dashboard__button admin-dashboard__button--outline">Descargar JSON</button>
          </div>
        </section>
      </div>

      {/* 🔧 Nueva sección para configuración de royalty */}
      <section className="admin-dashboard__section admin-dashboard__section--royalty">
        <h2 className="admin-dashboard__section-title">Configuración de Royalty</h2>

        {/* Porcentaje de royalty */}
        <div className="admin-dashboard__input-group">
          <input
            type="number"
            className="admin-dashboard__input"
            placeholder="Porcentaje de royalty (ej. 10)"
          />
        </div>

        {/* Wallet receptora */}
        <div className="admin-dashboard__input-group">
          <input
            type="text"
            className="admin-dashboard__input"
            placeholder="Wallet que recibirá el royalty"
          />
        </div>

        <button className="admin-dashboard__button">Guardar configuración</button>
      </section>
    </div>
  );
};

export default AdminDashboard;
