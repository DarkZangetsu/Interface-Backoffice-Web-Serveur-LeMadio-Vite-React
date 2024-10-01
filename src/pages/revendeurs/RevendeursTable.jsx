import { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import NouveauRevendeurModal from "../../components/NouveauRevendeurModal";
import { useNavigate } from "react-router-dom";

const RevendeursTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRevendeurs, setFilteredRevendeurs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const revendeurs = [
    {
      id: "R01",
      nom: "Ann Culhane",
      telephone: "038 42 365 26",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R02",
      nom: "Ahmad Rosser",
      telephone: "032 42 365 27",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R03",
      nom: "Zain Calzoni",
      telephone: "038 42 365 28",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R04",
      nom: "Leo Stanton",
      telephone: "034 42 365 29",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R05",
      nom: "Kaiya Vetrovs",
      telephone: "033 42 365 30",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R06",
      nom: "Ryan Westervelt",
      telephone: "033 42 365 27",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R07",
      nom: "Corey Stanton",
      telephone: "038 42 365 32",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R08",
      nom: "Adison Aminoff",
      telephone: "032 42 365 33",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R09",
      nom: "Ann Culhane",
      telephone: "038 42 365 26",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R010",
      nom: "Ahmad Rosser",
      telephone: "032 42 365 27",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R11",
      nom: "Zain Calzoni",
      telephone: "038 42 365 28",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R12",
      nom: "Leo Stanton",
      telephone: "034 42 365 29",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R13",
      nom: "Kaiya Vetrovs",
      telephone: "033 42 365 30",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R14",
      nom: "Ryan Westervelt",
      telephone: "033 42 365 27",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R15",
      nom: "Corey Stanton",
      telephone: "038 42 365 32",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
    {
      id: "R16",
      nom: "Adison Aminoff",
      telephone: "032 42 365 33",
      adresse:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    },
  ];

  useEffect(() => {
    const results = revendeurs.filter(
      (revendeur) =>
        revendeur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        revendeur.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        revendeur.telephone.includes(searchTerm) ||
        revendeur.adresse.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRevendeurs(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRevendeurs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handleClick = () => {
    navigate("/revendeur");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {/* Sidebar fixe */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-grow p-6 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center space-x-2">
                <div className="border rounded-md p-2">
                  <Filter size={20} className="text-gray-500" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Recherche..."
                    className="pl-10 pr-4 py-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              <button
                className="bg-[#4B8B32] text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                + Nouveau revendeur
              </button>
            </div>

            <div className="flex-grow overflow-auto">
              <table className="w-full text-center">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b">
                    <th className="text-left py-2 px-6 font-semibold"></th>
                    <th className="text-left py-2 px-6 font-semibold">
                      IDENTIFIANT
                    </th>
                    <th className="text-left py-2 px-6 font-semibold">
                      REVENDEURS
                    </th>
                    <th className="text-left py-2 px-6 font-semibold">
                      ADRESSE
                    </th>
                    <th className="text-right py-2 px-6 font-semibold">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((revendeur) => (
                    <tr key={revendeur.id} className="border-b">
                      <td className="py-3 px-6 text-gray-600">
                        <input type="checkbox" className="form-checkbox" />
                      </td>
                      <td className="py-3 px-6 text-gray-600">
                        {revendeur.id}
                      </td>
                      <td className="py-3 px-6">
                        <div>{revendeur.nom}</div>
                        <div className="text-sm text-gray-500">
                          {revendeur.telephone}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-gray-600">
                        {revendeur.adresse}
                      </td>
                      <td className="py-3 px-6 text-right">
                        <button
                          onClick={handleClick}
                          className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full hover:bg-[#4B8B32] transition duration-300 flex items-center justify-center space-x-1 inline-flex"
                        >
                          <div className="flex justify-center mb-1">
                            <img
                              src="book.png"
                              alt="book"
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <span>OUVRIR</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center p-6">
              <div className="text-sm text-gray-600">
                {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredRevendeurs.length)} sur{" "}
                {filteredRevendeurs.length}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Lignes par page: {itemsPerPage}
                </span>
                <div className="flex">
                  <button
                    className="p-1 border rounded-l-md"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={20} className="text-gray-400" />
                  </button>
                  <button
                    className="p-1 border rounded-r-md"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(filteredRevendeurs.length / itemsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(filteredRevendeurs.length / itemsPerPage)
                    }
                  >
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NouveauRevendeurModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RevendeursTable;
