import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import InvoiceModal from "./InvoiceModalHV";

const HistoriqueVente = () => {
  // eslint-disable-next-line no-unused-vars
  const [ventes, setVentes] = useState([
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
      date: "25 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 3,
      montant: "21.000 AR",
    },
    {
      id: 6,
      date: "20 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 7,
      date: "19 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 8,
      date: "25 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 3,
      montant: "21.000 AR",
    },
    {
      id: 9,
      date: "20 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 10,
      date: "19 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 11,
      date: "25 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 3,
      montant: "21.000 AR",
    },
    {
      id: 12,
      date: "20 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
    {
      id: 13,
      date: "19 aout 2024",
      client: "Lorem ipsum dolor sit amet",
      article: "LeMadio",
      quantite: 1,
      montant: "70.000 AR",
    },
  ]);

  const [filteredVentes, setFilteredVentes] = useState(ventes);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const results = ventes.filter((vente) =>
      Object.values(vente).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredVentes(results);
    setCurrentPage(1);
  }, [searchTerm, ventes]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredVentes.map((vente) => vente.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleOpenModal = (vente) => {
    setSelectedInvoice(vente);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVentes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4">
          <div className="flex mb-4">
            <div className="border rounded-md p-2 mr-2">
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

          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRows.length === filteredVentes.length}
                    />
                  </th>
                  <th className="py-3 px-4 border-b text-left">#</th>
                  <th className="py-3 px-4 border-b text-left">DATE</th>
                  <th className="py-3 px-4 border-b text-left">CLIENT</th>
                  <th className="py-3 px-4 border-b text-left">ARTICLE</th>
                  <th className="py-3 px-4 border-b text-left">QUANTITE</th>
                  <th className="py-3 px-4 border-b text-left">MONTANT</th>
                  <th className="py-3 px-4 border-b text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((vente) => (
                  <tr key={vente.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(vente.id)}
                        onChange={() => handleSelectRow(vente.id)}
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-left">{vente.id}</td>
                    <td className="py-2 px-4 border-b text-left">
                      {vente.date}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      {vente.client}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {vente.article}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {vente.quantite}
                    </td>
                    <td className="py-2 px-4 border-b text-left text-green-600 font-semibold">
                      {vente.montant}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      <button
                        className="border px-4 py-1 rounded-md hover:bg-[#4B8B32] transition duration-300"
                        onClick={() => handleOpenModal(vente)}
                      >
                        CONSULTER
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50">
          <span>
            {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredVentes.length)} sur{" "}
            {filteredVentes.length}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Lignes par page: {itemsPerPage}
            </span>
            <div className="flex">
              <button
                className="p-1 border rounded-l-md"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                      Math.ceil(filteredVentes.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredVentes.length / itemsPerPage)
                }
              >
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <InvoiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default HistoriqueVente;
