/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const InvoiceModalB = ({ isOpen, onClose, beneficiaryData, purchaseData }) => {
  if (!isOpen) return null;

  const benefice = beneficiaryData || {};
  const purchases = purchaseData || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[800px] h-[vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">BENEFICIAIRE FINALE</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <table className="w-full">
                <tbody>
                  {[
                    { label: "Mme/Mr:", value: benefice.client },
                    { label: "Surnom:", value: benefice.surname },
                    { label: "Numero:", value: benefice.phoneNumber },
                    { label: "Adresse:", value: benefice.address },
                    { label: "Province:", value: benefice.province },
                    { label: "Région:", value: benefice.region },
                    { label: "District:", value: benefice.district },
                    { label: "Commune:", value: benefice.commune },
                    { label: "Fokontany:", value: benefice.fokontany },
                  ].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-medium">{item.label}</td>
                      <td className="py-2">{item.value || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">RECHAUDS ACHETES</h3>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">NUMERO RECHAUD</th>
                    <th className="py-2 px-4 text-left">DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.length > 0 ? (
                    purchases.map((purchase, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{purchase.number || "-"}</td>
                        <td className="py-2 px-4">{purchase.date || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-2 px-4 text-center">
                        Aucune donnée disponible
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-start">
            <div className="w-[48%]">
              <img
                src="cin_recto.png"
                alt="CIN Recto"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="w-[48%]">
              <img
                src="cin_verso.png"
                alt="CIN Verso"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModalB;
