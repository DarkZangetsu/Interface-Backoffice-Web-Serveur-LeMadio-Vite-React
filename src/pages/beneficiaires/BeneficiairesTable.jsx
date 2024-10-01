/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import InvoiceModalB from "../../components/InvoiceModalB";

const BeneficiairesTable = () => {
  const [benefices, setBenefices] = useState([
    {
      id: 1,
      date: "11 septembre 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 2,
      montant: "14.000 AR",
    },
    {
      id: 2,
      date: "01 septembre 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 3,
      date: "01 septembre 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 4,
      date: "01 septembre 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 5,
      date: "25 août 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 3,
      montant: "21.000 AR",
    },
    {
      id: 6,
      date: "20 août 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 7,
      date: "19 août 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 8,
      date: "15 août 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "Open",
      quantite: 1,
      montant: "-270.00 CAD",
    },
  ]);

  const [filteredBenefices, setFilteredBenefices] = useState(benefices);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  useEffect(() => {
    const results = benefices.filter((benefice) =>
      Object.values(benefice).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredBenefices(results);
    setCurrentPage(1);
  }, [searchTerm, benefices]);

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleDetailsClick = (benefice) => {
    setSelectedBeneficiary(benefice);
    setIsModalOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBenefices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
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
            </div>

            <div className="flex-grow overflow-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">DATE</th>
                    <th className="p-3 text-left">CLIENT</th>
                    <th className="p-3 text-left">ARTICLE</th>
                    <th className="p-3 text-left">QUANTITE</th>
                    <th className="p-3 text-left">MONTANT</th>
                    <th className="p-3 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((benefice) => (
                    <tr key={benefice.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(benefice.id)}
                          onChange={() => handleSelectRow(benefice.id)}
                          className="mr-2"
                        />
                        {benefice.id}
                      </td>
                      <td className="p-3">{benefice.date}</td>
                      <td className="p-3">{benefice.client}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            benefice.article === "Open"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {benefice.article}
                        </span>
                      </td>
                      <td className="p-3 text-center">{benefice.quantite}</td>
                      <td
                        className={`p-3 font-semibold ${
                          benefice.montant.startsWith("-")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {benefice.montant}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDetailsClick(benefice)}
                          className="px-4 py-1 border rounded-md hover:bg-gray-100"
                        >
                          DETAILS
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50">
              <span className="text-sm text-gray-600">
                {indexOfFirstItem + 1} -{" "}
                {Math.min(indexOfLastItem, filteredBenefices.length)} of{" "}
                {filteredBenefices.length}
              </span>
              <div className="flex items-center">
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
                        Math.ceil(filteredBenefices.length / itemsPerPage)
                      )
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(filteredBenefices.length / itemsPerPage)
                  }
                >
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InvoiceModalB
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        beneficiaryData={selectedBeneficiary}
        purchaseData={selectedBeneficiary ? selectedBeneficiary.purchases : []}
      />
    </div>
  );
};

export default BeneficiairesTable;
