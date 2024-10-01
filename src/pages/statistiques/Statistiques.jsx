/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const StatCard = ({
  title,
  value,
  subtitle,
  color,
  bottomText,
  iconSrc,
  goalDate,
  objective,
}) => (
  <div
    className={`bg-white rounded-lg shadow p-4 flex flex-col justify-between h-full`}
  >
    <div className="flex items-center space-x-4">
      <div
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white text-xs font-semibold`}
      >
        {title}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500 text-sm">{subtitle}</div>
      </div>
    </div>
    <div className="flex flex-col mt-4 text-gray-400 text-xs">
      <div className="flex items-center">
        {iconSrc && <img src={iconSrc} alt="icon" className="w-4 h-4 mr-1" />}
        <span>Objectif: {objective || bottomText}</span>
      </div>
      {goalDate && (
        <div className="mt-1 flex items-center space-x-2">
          <img
            src="icons/reminder.png"
            alt="Date buttoir"
            className="h-5 w-5"
          />
          <span>Deadline: {goalDate}</span>
        </div>
      )}
    </div>
  </div>
);

const StatisticsDashboard = () => {
  const [goalDates, setGoalDates] = useState({});
  const [goalObjectives, setGoalObjectives] = useState({});

  useEffect(() => {
    const savedDates = localStorage.getItem("goalDates");
    const savedObjectives = localStorage.getItem("goalObjectives");
    if (savedDates) {
      setGoalDates(JSON.parse(savedDates));
    }
    if (savedObjectives) {
      setGoalObjectives(JSON.parse(savedObjectives));
    }
  }, []);

  const iconPaths = {
    icon: "target.png",
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="ODD 01"
          value="2.480"
          subtitle="Foyers"
          color="bg-green-500"
          bottomText="12.000"
          iconSrc={iconPaths.icon}
          goalDate={goalDates.ODD01_1}
          objective={goalObjectives.ODD01_1}
        />
        <StatCard
          title="ODD 01"
          value="11"
          subtitle="Revendeuses"
          color="bg-green-500"
          bottomText="9"
          iconSrc={iconPaths.icon}
          goalDate={goalDates.ODD01_2}
          objective={goalObjectives.ODD01_2}
        />
        <StatCard
          title="ODD 07"
          value="34.000"
          subtitle="Bénéficiaires"
          color="bg-yellow-500"
          bottomText="56.000"
          iconSrc={iconPaths.icon}
          goalDate={goalDates.ODD07_1}
          objective={goalObjectives.ODD07_1}
        />
        <StatCard
          title="ODD 07"
          value="0,05 %"
          subtitle="de population équipé"
          color="bg-yellow-500"
          bottomText="0,17%"
          iconSrc={iconPaths.icon}
          goalDate={goalDates.ODD07_2}
          objective={goalObjectives.ODD07_2}
        />
        <StatCard
          title="ODD 13"
          value="55 t"
          subtitle="de carbone réduit"
          color="bg-gray-600"
          bottomText="120.000 t"
          iconSrc={iconPaths.icon}
          goalDate={goalDates.ODD13}
          objective={goalObjectives.ODD13}
        />
        <StatCard
          title="ODD 15"
          value="25 t"
          subtitle="d'équivalent bois"
          color="bg-green-300"
          bottomText="50.000 t"
          iconSrc={iconPaths.icon}
          goalDate={goalDates.ODD15}
          objective={goalObjectives.ODD15}
        />
      </div>
    </div>
  );
};

export default function Statistiques() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-grow p-6 overflow-auto bg-gray-100">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h1 className="text-xl font-semibold">Statistiques</h1>
          </div>
          <StatisticsDashboard />
        </main>
      </div>
    </div>
  );
}
