'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import './login.css';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Admin Login</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">
            Usuario
            <input type="text" className="login__input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="login__label">
            Contraseña
            <input type="password" className="login__input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" className="login__button">Ingresar</button>
        </form>
      </div>
    </div>
  );
}
