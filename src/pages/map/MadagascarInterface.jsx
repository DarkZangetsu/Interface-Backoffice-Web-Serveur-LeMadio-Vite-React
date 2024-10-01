import { Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Liste complète des régions de Madagascar
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

const MadagascarInterface = () => {
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    region: "",
    type: "",
    name: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enabledRegions, setEnabledRegions] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const data = [
        {
          id: 1,
          lat: -18.9149,
          lng: 47.5316,
          name: "Revendeur Solo",
          location: "Antananarivo",
          type: "revendeur",
        },
        {
          id: 2,
          lat: -20.2884,
          lng: 44.317,
          name: "Revendeur Rakoto",
          location: "Morondava",
          type: "revendeur",
        },
        {
          id: 3,
          lat: -13.6635,
          lng: 49.8012,
          name: "Revendeur Jean",
          location: "Antsiranana",
          type: "revendeur",
        },
        {
          id: 4,
          lat: -18.1499,
          lng: 49.3964,
          name: "Revendeur Pierre",
          location: "Toamasina",
          type: "revendeur",
        },
        {
          id: 5,
          lat: -22.2885,
          lng: 43.2522,
          name: "Revendeur Paul",
          location: "Toliara",
          type: "revendeur",
        },
        {
          id: 6,
          lat: -19.0,
          lng: 47.0,
          name: "Client Rasoa",
          location: "Arivonimamo",
          type: "client",
        },
        {
          id: 7,
          lat: -18.1667,
          lng: 47.1833,
          name: "Client Marie",
          location: "Antsirabe",
          type: "client",
        },
        {
          id: 8,
          lat: -17.3895,
          lng: 49.3788,
          name: "Client Luc",
          location: "Fenoarivo Atsinanana",
          type: "client",
        },
        {
          id: 9,
          lat: -14.8792,
          lng: 50.2797,
          name: "Client Sophie",
          location: "Antalaha",
          type: "client",
        },
        {
          id: 10,
          lat: -21.4667,
          lng: 47.1,
          name: "Client Michel",
          location: "Fianarantsoa",
          type: "client",
        },
      ];

      const markersWithRegions = await Promise.all(
        data.map(async (marker) => {
          const region = await getRegionName(marker.lat, marker.lng);
          return { ...marker, region };
        })
      );

      setMarkers(markersWithRegions);
      setFilteredMarkers(markersWithRegions);
    };

    const savedToggles = localStorage.getItem("regionToggles");
    if (savedToggles) {
      const toggles = JSON.parse(savedToggles);
      const enabled = Object.keys(toggles).filter((region) => toggles[region]);
      setEnabledRegions(enabled);
    } else {
      setEnabledRegions(MADAGASCAR_REGIONS);
    }

    fetchMarkers();
  }, []);

  const getRegionName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=8&addressdetails=1`
      );
      const data = await response.json();
      const region = data.address.state || data.address.region || "Unknown";
      return MADAGASCAR_REGIONS.includes(region) ? region : "Unknown";
    } catch (error) {
      console.error("Error fetching region name:", error);
      return "Unknown";
    }
  };

  const handleFilter = () => {
    const filtered = markers.filter((marker) => {
      return (
        (filterCriteria.region === "" ||
          marker.region === filterCriteria.region) &&
        (filterCriteria.type === "" || marker.type === filterCriteria.type) &&
        (filterCriteria.name === "" ||
          marker.name.toLowerCase().includes(filterCriteria.name.toLowerCase()))
      );
    });
    setFilteredMarkers(filtered);
    setIsDialogOpen(false);
  };

  const resetFilter = () => {
    setFilterCriteria({ region: "", type: "", name: "" });
    setFilteredMarkers(markers);
    setIsDialogOpen(false);
  };

  const getStats = () => {
    const stats = {
      total: filteredMarkers.length,
      revendeurs: filteredMarkers.filter((m) => m.type === "revendeur").length,
      clients: filteredMarkers.filter((m) => m.type === "client").length,
    };
    return stats;
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4 mt-3 relative">
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
            <div className="p-4 bg-[#4B8B32] text-white font-bold text-center">
              Geo Map
            </div>
            <div className="p-4 flex justify-between items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer text-[#4B8B32]"
                onClick={() => setIsDialogOpen(true)}
              >
                <Filter size={24} />
                <span className="font-bold">Filtrer</span>
              </div>
              <div className="flex space-x-4 text-sm">
                <p>Total: {getStats().total}</p>
                <p>Revendeurs: {getStats().revendeurs}</p>
                <p>Clients: {getStats().clients}</p>
              </div>
            </div>
            <div className="flex-grow">
              <MapContainer
                center={[-18.7669, 46.8691]}
                zoom={6}
                style={{ height: "100%", width: "100%" }}
                className="map"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredMarkers.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={[marker.lat, marker.lng]}
                    icon={marker.type === "revendeur" ? greenIcon : yellowIcon}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{marker.name}</h3>
                        <p>Type: {marker.type}</p>
                        <p>Région: {marker.region}</p>
                        <p>
                          Coordonnées: {marker.lat.toFixed(4)},{" "}
                          {marker.lng.toFixed(4)}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center"
          style={{ zIndex: 1000 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Filtrer la carte
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Régions
              </label>
              <select
                value={filterCriteria.region}
                onChange={(e) =>
                  setFilterCriteria({
                    ...filterCriteria,
                    region: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-[#4B8B32] focus:border-[#4B8B32]"
              >
                <option value="">Tous les régions</option>
                {enabledRegions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Type
              </label>
              <select
                value={filterCriteria.type}
                onChange={(e) =>
                  setFilterCriteria({ ...filterCriteria, type: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-[#4B8B32] focus:border-[#4B8B32]"
              >
                <option value="">Tous les types</option>
                <option value="revendeur">Revendeur</option>
                <option value="client">Client</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Nom(Revendeur ou Client)
              </label>
              <input
                type="text"
                value={filterCriteria.name}
                onChange={(e) =>
                  setFilterCriteria({ ...filterCriteria, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-[#4B8B32] focus:border-[#4B8B32]"
                placeholder="Entrer nom"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={resetFilter}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Réinitialiser
              </button>
              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-[#4B8B32] text-white rounded-lg hover:bg-green-600 transition"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MadagascarInterface;
