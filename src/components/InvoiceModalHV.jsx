/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const InvoiceModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex justify-between items-start">
          <div className="w-2/3 pr-8">
            <h2 className="text-2xl font-bold mb-4">FACTURE</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="mb-2">
                  <span className="font-semibold">N°:</span>{" "}
                  {invoice.id.toString().padStart(6, "0")}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Date:</span> {invoice.date}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Mme/Mr:</span>{" "}
                  {invoice.client}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Surnom:</span>{" "}
                  {invoice.surnom}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Numero:</span>{" "}
                  {invoice.numero}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Adresse:</span>{" "}
                  {invoice.adresse}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Province:</span>{" "}
                  {invoice.province}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Région:</span>{" "}
                  {invoice.region}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">District:</span>{" "}
                  {invoice.district}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Commune:</span>{" "}
                  {invoice.commune}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Fokontany:</span>{" "}
                  {invoice.fokontany}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                Détails de la commande
              </h3>
              <p className="mb-2">
                <span className="font-semibold">Rechargés:</span>{" "}
                {invoice.recharges}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Nombres:</span>{" "}
                {invoice.quantite}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Prix Unitaire:</span>{" "}
                {invoice.prixUnitaire} Ar
              </p>
              <p className="mb-2">
                <span className="font-semibold">Prix Total:</span>{" "}
                {invoice.prixTotal} Ar
              </p>
            </div>
          </div>

          <div className="w-1/3">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Carte d'identité (Recto)
              </h3>
              <img
                src="cin_recto.png"
                alt="Carte d'identité (Recto)"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Carte d'identité (Verso)
              </h3>
              <img
                src="cin_verso.png"
                alt="Carte d'identité (Verso)"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
