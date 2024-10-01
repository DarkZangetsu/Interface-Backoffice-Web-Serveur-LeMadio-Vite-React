import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Parametres from "../../components/Parametres";
import Logs from "../../components/Logs";

export default function Administration() {
  const [activeTab, setActiveTab] = useState("logs");

  const renderTabContent = () => {
    switch (activeTab) {
      case "logs":
        return <Logs />;
      case "parametres":
        return <Parametres />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-grow p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <button
                className={`mr-2 px-4 py-2 rounded ${
                  activeTab === "logs"
                    ? "bg-yellow-400 text-black"
                    : "border border-gray-300 text-gray-700"
                }`}
                onClick={() => setActiveTab("logs")}
              >
                Logs activités
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "parametres"
                    ? "bg-yellow-400 text-black"
                    : "border border-gray-300 text-gray-700"
                }`}
                onClick={() => setActiveTab("parametres")}
              >
                Paramètres
              </button>
            </div>
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
