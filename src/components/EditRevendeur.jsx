/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { ChevronDown, MapPin, Pencil, X, Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correction pour l'icône par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

// eslint-disable-next-line react/prop-types
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// eslint-disable-next-line react/prop-types
const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : <Marker position={position} />;
};

function EditRevendeur() {
  const [isEditing, setIsEditing] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [initialFormData, setInitialFormData] = useState(null);
  const [formData, setFormData] = useState({
    name: "Ann Culhane",
    phone: "038 42 305 26",
    category: "Private",
    fokotany: "Ambohipo",
    cin: "101 011 558 234",
    commune: "Antananarivo",
    sex: "Féminin",
    region: "Analamanga",
    domicile: "VL 23 Ambatomiangara 101 Antananarivo",
    location: "-18.925741, 47.530670",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState([-18.8792, 47.5079]);
  const [mapZoom, setMapZoom] = useState(13);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleEdit = () => {
    if (!isEditing) {
      setInitialFormData(formData);
      toast.info("Mode édition activé");
    } else {
      setFormData(initialFormData);
      toast.info("Modifications annulées");
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMapSelection = () => {
    if (position) {
      setFormData((prevState) => ({
        ...prevState,
        location: `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`,
      }));
      setIsMapModalOpen(false);
    }
  };

  const openMapModal = () => {
    const [lat, lng] = formData.location
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    setPosition({ lat, lng });
    setMapCenter([lat, lng]);
    setIsMapModalOpen(true);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setShowSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}+Madagascar&format=json&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleSelectResult = (result) => {
    const newPosition = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };
    setPosition(newPosition);
    setMapCenter([newPosition.lat, newPosition.lng]);
    setMapZoom(16);
    setSearchQuery(result.display_name);
    updateLocationInfo(result);
    setShowSuggestions(false);
  };

  const handleMapClick = (e) => {
    const newPosition = [e.latlng.lat, e.latlng.lng];
    setPosition(newPosition);
    setFormData((prevState) => ({
      ...prevState,
      localisation: `${newPosition[0].toFixed(6)}, ${newPosition[1].toFixed(
        6
      )}`,
    }));
    fetchReverseGeocode(newPosition);
    setShowSuggestions(false);
  };

  const updateLocationInfo = (result) => {
    const address = result.address;
    setFormData((prevState) => ({
      ...prevState,
      fokotany: address.suburb || address.neighbourhood || address.hamlet || "",
      commune: address.city || address.town || address.village || "",
      region: address.state || "",
      location: `${result.lat}, ${result.lon}`,
    }));
  };

  const fetchReverseGeocode = async (coords) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&addressdetails=1`
      );
      const data = await response.json();
      updateLocationInfo(data);
    } catch (error) {
      console.error("Error fetching reverse geocode:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleEdit}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <Pencil size={20} className="mr-2" />
          {isEditing ? "ANNULER" : "EDITER"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Form Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NOM
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro téléphone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fokotany
          </label>
          <input
            type="text"
            name="fokotany"
            value={formData.fokotany}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CIN
          </label>
          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commune
          </label>
          <input
            type="text"
            name="commune"
            value={formData.commune}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sexe
          </label>
          <input
            type="text"
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Région
          </label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domicile
          </label>
          <input
            type="text"
            name="domicile"
            value={formData.domicile}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Localisation
          </label>
          <div className="relative">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-green-300 rounded pr-10"
              readOnly={true}
            />
            <MapPin
              size={20}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={openMapModal}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="text-gray-600 hover:text-gray-800 font-medium">
          CHANGER LE MOT DE PASSE
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <button className="bg-[#4B8B32] text-white w-48 px-6 py-2 rounded hover:bg-green-700 mr-16">
          CONFIRMER
        </button>
      </div>

      <ToastContainer />
      {isMapModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-[800px] p-4 relative">
            <button
              onClick={() => setIsMapModalOpen(false)}
              className="absolute top-2 right-2 z-10"
            >
              <X size={24} />
            </button>
            <h3 className="text-lg font-semibold mb-4">
              Modifier la localisation
            </h3>
            <div className="mb-4 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Rechercher une adresse à Madagascar..."
                className="w-full h-10 px-3 pr-10 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <Search
                size={20}
                className="absolute right-3 top-2 text-gray-400 cursor-pointer"
                onClick={handleSearch}
              />
            </div>
            <div className="relative z-20">
              {showSuggestions && searchResults.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-md w-full max-h-40 overflow-y-auto shadow-md">
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectResult(result)}
                      className="cursor-pointer hover:bg-gray-100 p-2"
                    >
                      {result.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="w-full h-[400px] mb-4 relative z-10">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker
                  position={position}
                  setPosition={(newPosition) => {
                    setPosition(newPosition);
                    fetchReverseGeocode(newPosition);
                  }}
                />
                <MapUpdater center={mapCenter} zoom={mapZoom} />
              </MapContainer>
            </div>
            <input
              type="text"
              value={
                position
                  ? `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`
                  : ""
              }
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 mb-4"
              readOnly
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleMapSelection}
                className="w-60 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4B8B32] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B8B32]"
              >
                CONFIRMER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditRevendeur;
