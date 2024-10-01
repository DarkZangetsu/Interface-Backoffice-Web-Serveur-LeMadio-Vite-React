import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ADESLogin from "./pages/login/ADESLogin";
import Dashboard from "./pages/dashboard/Dashboard";
import MadagascarInterface from "./pages/map/MadagascarInterface";
import RevendeursTable from "./pages/revendeurs/RevendeursTable";
import RevendeurInterface from "./pages/revendeurs/RevendeurInterface";
import BeneficiairesTable from "./pages/beneficiaires/BeneficiairesTable";
import Statistiques from "./pages/statistiques/Statistiques";
import Profils from "./pages/profils/Profils";
import Administration from "./pages/administration/Administration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ADESLogin />} />

        <Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/statistiques" element={<Statistiques />} />
          <Route path="/geomap" element={<MadagascarInterface />} />
          <Route path="/revendeurs" element={<RevendeursTable />} />
          <Route path="/revendeur" element={<RevendeurInterface />} />
          <Route path="/beneficiaires" element={<BeneficiairesTable />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/profils" element={<Profils />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
