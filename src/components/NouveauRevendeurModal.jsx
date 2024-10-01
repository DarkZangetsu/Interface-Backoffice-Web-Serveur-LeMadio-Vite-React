/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { X, Eye, MapPin, Search } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import apiService from "./apiService";

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

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });
  return null;
};

const NouveauRevendeurModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nom: "",
    numeroTelephone: "",
    categorie: "",
    fokotany: "",
    cin: "",
    commune: "",
    sexe: "",
    region: "",
    domicile: "",
    password: "",
    localisation: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [position, setPosition] = useState([-18.8792, 47.5079]);
  const [mapCenter, setMapCenter] = useState([-18.8792, 47.5079]);
  const [mapZoom, setMapZoom] = useState(13);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef(null);
  const [isSearchListVisible, setIsSearchListVisible] = useState(false);
  const searchInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validation des champs du formulaire
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.nom.trim()) {
      errors.nom = "Le nom est requis";
      isValid = false;
    }
    if (!formData.numeroTelephone.trim()) {
      errors.numeroTelephone = "Le numéro de téléphone est requis";
      isValid = false;
    }
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) {
      setErrorMessage("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    const dataToSend = {
      username: formData.nom,
      telephone: formData.numeroTelephone,
      categorie: formData.categorie,
      fokotany: formData.fokotany,
      cin: formData.cin,
      commune: formData.commune,
      sexe: formData.sexe,
      region: formData.region,
      domicile: formData.domicile,
      password: formData.password,
      localisation: formData.localisation,
    };

    try {
      const response = await apiService.inscription(dataToSend);
      console.log("Inscription réussie:", response);
      setSuccessMessage("Inscription réussie !");
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setErrorMessage(
        error.message || "Une erreur est survenue lors de l'inscription."
      );
    }
  };

  const handleMapSelection = () => {
    if (position) {
      setFormData((prevState) => ({
        ...prevState,
        localisation: `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`,
      }));
      setIsMapModalOpen(false);
    }
  };
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}+Madagascar&format=json&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
      setIsSearchListVisible(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };
  const handleSelectResult = (result) => {
    const newPosition = [parseFloat(result.lat), parseFloat(result.lon)];
    setPosition(newPosition);
    setMapCenter(newPosition);
    setMapZoom(16);
    setSearchQuery(result.display_name);
    updateLocationInfo(result);
    setIsSearchListVisible(false);
    setIsSearching(false);
    setSearchResults([]);

    // Focus sur la carte après la sélection
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, isSearching]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchListVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateLocationInfo = (result) => {
    const address = result.address;
    setFormData((prevState) => ({
      ...prevState,
      fokotany: address.suburb || address.neighbourhood || address.hamlet || "",
      commune: address.city || address.town || address.village || "",
      region: address.state || "",
      localisation: `${result.lat}, ${result.lon}`,
    }));
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
    // Effectuer une recherche inverse pour obtenir les informations de l'adresse
    fetchReverseGeocode(newPosition);
  };

  const fetchReverseGeocode = async (coords) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}&addressdetails=1`
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-[800px] p-4 sm:p-6 relative">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
          Nouveau revendeur
        </h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4"
        >
          <X size={24} />
        </button>
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-4"
        >
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro téléphone
            </label>
            <input
              type="text"
              name="numeroTelephone"
              value={formData.numeroTelephone}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <input
              type="text"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fokotany
            </label>
            <input
              type="text"
              name="fokotany"
              value={formData.fokotany}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CIN
            </label>
            <input
              type="text"
              name="cin"
              value={formData.cin}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commune
            </label>
            <input
              type="text"
              name="commune"
              value={formData.commune}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sexe
            </label>
            <select
              name="sexe"
              value={formData.sexe}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="">Sélectionner</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domicile
            </label>
            <input
              type="text"
              name="domicile"
              value={formData.domicile}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Eye
              size={20}
              className="absolute right-3 top-9 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localisation
            </label>
            <input
              type="text"
              name="localisation"
              value={formData.localisation}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            />
            <MapPin
              size={20}
              className="absolute right-3 top-9 text-gray-400 cursor-pointer"
              onClick={() => setIsMapModalOpen(true)}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Eye
              size={20}
              className="absolute right-3 top-9 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 mt-4 sm:mt-6 flex justify-center">
            <button
              type="submit"
              className="w-60 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4B8B32] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B8B32]"
            >
              ENREGISTRER
            </button>
          </div>
        </form>
      </div>

      {isMapModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg w-full max-w-[800px] p-4 relative">
            <button
              onClick={() => setIsMapModalOpen(false)}
              className="absolute top-2 right-2 z-10"
            >
              <X size={24} />
            </button>
            <h3 className="text-lg font-semibold mb-4">
              Sélectionner la localisation
            </h3>
            <div className="mb-4 relative" ref={searchInputRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => setIsSearchListVisible(true)}
                placeholder="Rechercher une adresse à Madagascar..."
                className="w-full h-10 px-3 pr-10 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <Search
                size={20}
                className="absolute right-3 top-2 text-gray-400 cursor-pointer"
                onClick={() => {
                  setIsSearching(true);
                  handleSearch();
                }}
              />
              {isSearchListVisible && searchResults.length > 0 && (
                <ul className="absolute z-20 bg-white border border-gray-300 rounded-md w-full max-h-40 overflow-y-auto shadow-md mt-1">
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
                ref={mapRef}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} />
                <MapUpdater center={mapCenter} zoom={mapZoom} />
                <MapClickHandler onMapClick={handleMapClick} />
              </MapContainer>
            </div>
            <input
              type="text"
              value={
                position
                  ? `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`
                  : ""
              }
              className="w-full h-10 px-3 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 mb-4"
              readOnly
            />
            <div className="col-span-1 sm:col-span-2 mt-4 sm:mt-6 flex justify-center">
              <button
                onClick={handleMapSelection}
                type="button"
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
};

export default NouveauRevendeurModal;
