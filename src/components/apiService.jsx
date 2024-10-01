import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiService = {
  inscription: async (userData) => {
    try {
      const response = await axiosInstance.post("/api/inscription/", userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Erreur de réponse:", error.response.data);
        console.error("Statut:", error.response.status);
        throw new Error(
          `Erreur ${error.response.status}: ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        console.error("Erreur de requête:", error.request);
        throw new Error(
          "Aucune réponse reçue du serveur. Vérifiez votre connexion."
        );
      } else {
        console.error("Erreur:", error.message);
        throw new Error(`Une erreur est survenue: ${error.message}`);
      }
    }
  },
};

export default apiService;
