import { useState } from "react";
import { Menu } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "leaflet/dist/leaflet.css";
import EditRevendeur from "../../components/EditRevendeur";
import EtatStock from "../../components/EtatStock";
import HistoriqueVente from "../../components/HistoriqueVente";
import Approvisionements from "../../components/Approvisionements";
import { useNavigate } from "react-router-dom";

const RevendeurInterface = () => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    name: "Ann Culhane",
  });
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("info");

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div>
            <EditRevendeur />
          </div>
        );
      case "stock":
        return (
          <div>
            <EtatStock />
          </div>
        );
      case "historique":
        return (
          <div>
            <HistoriqueVente />
          </div>
        );
      case "approvisionnement":
        return (
          <div>
            <Approvisionements />
          </div>
        );
      default:
        return null;
    }
  };

  const handleClick = () => {
    navigate("/revendeurs");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`px-4 py-2 rounded font-semibold ${
                      activeTab === "info"
                        ? "bg-yellow-400 text-black"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    {formData.name}
                  </button>
                  <button
                    onClick={() => setActiveTab("stock")}
                    className={`px-4 py-2 rounded ${
                      activeTab === "stock"
                        ? "bg-yellow-400 text-black"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    Etat de stock
                  </button>
                  <button
                    onClick={() => setActiveTab("historique")}
                    className={`px-4 py-2 rounded ${
                      activeTab === "historique"
                        ? "bg-yellow-400 text-black"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    Historique des ventes
                  </button>
                  <button
                    onClick={() => setActiveTab("approvisionnement")}
                    className={`px-4 py-2 rounded ${
                      activeTab === "approvisionnement"
                        ? "bg-yellow-400 text-black"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    Approvisionnements
                  </button>
                </div>
                <button
                  onClick={handleClick}
                  className="border border-gray-300 px-4 py-2 rounded text-gray-700 flex items-center"
                >
                  <Menu size={20} />
                  <span className="mr-2">REVENIR A LA LISTE</span>
                </button>
              </div>

              {/* Contenu dynamique de l'onglet */}
              <div>{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevendeurInterface;
