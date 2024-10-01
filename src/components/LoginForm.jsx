/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    navigate("/dashboard");
    // e.preventDefault();
    // setError("");

    // try {
    //   const response = await api.post("/api/token/", { username, password });
    //   localStorage.setItem("token", response.data.token);
    //   navigate("/dashboard");
    // } catch (err) {
    //   handleError(err);
    // }
  };

  const handleError = (err) => {
    if (err.response) {
      console.error("Erreur de réponse:", err.response.data);
      console.error("Statut:", err.response.status);

      if (err.response.status === 401) {
        setError("Authentification échouée. Vérifiez vos identifiants.");
      } else {
        setError(`Erreur du serveur: ${err.response.status}`);
      }
    } else if (err.request) {
      console.error("Erreur de requête:", err.request);
      setError("Aucune réponse reçue du serveur. Vérifiez votre connexion.");
    } else {
      console.error("Erreur:", err.message);
      setError("Une erreur s'est produite lors de l'envoi de la requête.");
    }
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-[#4B8B32]"
        >
          Nom d'utilisateur
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4B8B32] focus:border-[#4B8B32]"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#4B8B32]"
        >
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4B8B32] focus:border-[#4B8B32]"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-center">
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4B8B32] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B8B32]"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
