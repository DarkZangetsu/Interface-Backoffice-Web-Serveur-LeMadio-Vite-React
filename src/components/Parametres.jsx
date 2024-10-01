import { useState, useEffect } from "react";

const MADAGASCAR_REGIONS = [
  "Alaotra-Mangoro",
  "Amoron'i Mania",
  "Analamanga",
  "Analanjirofo",
  "Androy",
  "Anosy",
  "Atsimo-Andrefana",
  "Atsimo-Atsinanana",
  "Atsinanana",
  "Betsiboka",
  "Boeny",
  "Bongolava",
  "Diana",
  "Haute Matsiatra",
  "Ihorombe",
  "Itasy",
  "Melaky",
  "Menabe",
  "Sava",
  "Sofia",
  "Vakinankaratra",
  "Vatovavy-Fitovinany",
];

const GOALS = [
  { id: "ODD01_1", title: "ODD 01 - Foyers" },
  { id: "ODD01_2", title: "ODD 01 - Bénéficiaires" },
  { id: "ODD07_1", title: "ODD 07 - Bénéficiaires" },
  { id: "ODD07_2", title: "ODD 07 - Population équipée" },
  { id: "ODD13", title: "ODD 13 - Carbone réduit" },
  { id: "ODD15", title: "ODD 15 - Équivalent bois" },
];

export default function Parametres() {
  const [regionToggles, setRegionToggles] = useState({});
  const [goalDates, setGoalDates] = useState({});
  const [goalObjectives, setGoalObjectives] = useState({});

  useEffect(() => {
    const savedToggles = localStorage.getItem("regionToggles");
    const savedDates = localStorage.getItem("goalDates");
    const savedObjectives = localStorage.getItem("goalObjectives");

    if (savedToggles) {
      setRegionToggles(JSON.parse(savedToggles));
    } else {
      const initialToggles = MADAGASCAR_REGIONS.reduce((acc, region) => {
        acc[region] = true;
        return acc;
      }, {});
      setRegionToggles(initialToggles);
    }

    if (savedDates) {
      setGoalDates(JSON.parse(savedDates));
    } else {
      const initialDates = GOALS.reduce((acc, goal) => {
        acc[goal.id] = "";
        return acc;
      }, {});
      setGoalDates(initialDates);
    }

    if (savedObjectives) {
      setGoalObjectives(JSON.parse(savedObjectives));
    } else {
      const initialObjectives = GOALS.reduce((acc, goal) => {
        acc[goal.id] = "";
        return acc;
      }, {});
      setGoalObjectives(initialObjectives);
    }
  }, []);

  const handleToggle = (region) => {
    const newToggles = { ...regionToggles, [region]: !regionToggles[region] };
    setRegionToggles(newToggles);
    localStorage.setItem("regionToggles", JSON.stringify(newToggles));
  };

  const handleDateChange = (goalId, date) => {
    const newDates = { ...goalDates, [goalId]: date };
    setGoalDates(newDates);
    localStorage.setItem("goalDates", JSON.stringify(newDates));
  };

  const handleObjectiveChange = (goalId, objective) => {
    const newObjectives = { ...goalObjectives, [goalId]: objective };
    setGoalObjectives(newObjectives);
    localStorage.setItem("goalObjectives", JSON.stringify(newObjectives));
  };

  return (
    <div className="space-y-4">
      {/* Geo Map section */}
      <div className="bg-[#FFEBD8] p-5">
        <h2 className="text-lg font-medium">
          <strong>Geo Map</strong>
        </h2>
        <div className="bg-[#4B8B32] h-1 mt-5"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MADAGASCAR_REGIONS.map((region) => (
          <div key={region} className="flex items-center space-x-2">
            <div className="relative inline-block">
              <input
                type="checkbox"
                id={`toggle-${region}`}
                checked={regionToggles[region]}
                onChange={() => handleToggle(region)}
                className="hidden"
              />
              <label
                htmlFor={`toggle-${region}`}
                className="flex items-center cursor-pointer"
              >
                <div className="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center">
                  <svg
                    className={`w-4 h-4 text-green-500 ${
                      regionToggles[region] ? "block" : "hidden"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <span className="ml-2 text-sm">{region}</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/*Objectifs section */}
      <div className="bg-[#FFEBD8] p-5 mt-8">
        <h2 className="text-lg font-medium">
          <strong>Dates et Objectifs</strong>
        </h2>
        <div className="bg-[#4B8B32] h-1 mt-5"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GOALS.map((goal) => (
          <div key={goal.id} className="flex flex-col space-y-2">
            <label htmlFor={`date-${goal.id}`} className="text-sm font-medium">
              {goal.title}
            </label>
            <input
              type="date"
              id={`date-${goal.id}`}
              value={goalDates[goal.id] || ""}
              onChange={(e) => handleDateChange(goal.id, e.target.value)}
              className="border rounded-md p-2 date-input"
            />
            <input
              type="text"
              id={`objective-${goal.id}`}
              value={goalObjectives[goal.id] || ""}
              onChange={(e) => handleObjectiveChange(goal.id, e.target.value)}
              placeholder="Objectif"
              className="border rounded-md p-2"
            />
          </div>
        ))}
      </div>

      <div className="bg-[#4B8B32] h-1 mt-8"></div>
    </div>
  );
}
