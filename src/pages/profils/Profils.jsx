/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  Mail,
  Phone,
  Briefcase,
  ShoppingCart,
  Users,
  BarChart,
  Settings,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ProfileInfo = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 text-gray-600 mb-2">
    {icon}
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
    {icon}
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-bold text-[#4B8B32]">{value}</p>
    </div>
  </div>
);

export default function Profils() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-grow p-6 overflow-hidden">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Profil Administrateur
              </h1>
              <button className="bg-[#4B8B32] text-white px-4 py-2 rounded-lg hover:bg-[#3a6d27] transition duration-300">
                Modifier le profil
              </button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="LOGO-ADES_HD.png"
                alt="Photo de profil"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Ades Admin</h2>
                <p className="text-gray-600">Administrateur Principal</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileInfo
                icon={<Mail className="w-5 h-5 text-[#4B8B32]" />}
                label="Email"
                value="ades.admin@adesolaire.org"
              />
              <ProfileInfo
                icon={<Phone className="w-5 h-5 text-[#4B8B32]" />}
                label="Téléphone"
                value="+261 32 34 033 38"
              />
              <ProfileInfo
                icon={<Briefcase className="w-5 h-5 text-[#4B8B32]" />}
                label="Département"
                value="Administration Générale"
              />
              <ProfileInfo
                icon={<Settings className="w-5 h-5 text-[#4B8B32]" />}
                label="Niveau d'accès"
                value="Administrateur complet"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              icon={<ShoppingCart className="w-8 h-8 text-[#4B8B32]" />}
              label="Nouveaux revendeurs"
              value="3"
            />
            <StatCard
              icon={<Users className="w-8 h-8 text-[#4B8B32]" />}
              label="Nouveaux bénéficiaires"
              value="24"
            />
            <StatCard
              icon={<BarChart className="w-8 h-8 text-[#4B8B32]" />}
              label="Nombres de vente"
              value="532"
            />
            <StatCard
              icon={<Settings className="w-8 h-8 text-[#4B8B32]" />}
              label="Tâches en attente"
              value="7"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Activités récentes
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between border-b pb-2">
                <span>Mise à jour de données revendeur</span>
                <span className="text-gray-500 text-sm">Il y a 2 heures</span>
              </li>
              <li className="flex items-center justify-between border-b pb-2">
                <span>Approbation de 5 nouveaux ventes</span>
                <span className="text-gray-500 text-sm">Il y a 4 heures</span>
              </li>
              <li className="flex items-center justify-between border-b pb-2">
                <span>Résolution d'un problème d'un revendeur</span>
                <span className="text-gray-500 text-sm">Il y a 6 heures</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
