import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const EtatStock = () => {
  const soldData = {
    labels: ["1D", "5D", "1M", "6M", "1Y"],
    datasets: [
      {
        label: "Article Vendu",
        data: [10, 30, 20, 40, 50],
        borderColor: "#FBBF24",
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const forecastData = {
    labels: ["1D", "5D", "1M", "6M", "1Y"],
    datasets: [
      {
        label: "Prévision",
        data: [20, 30, 40, 50, 45],
        borderColor: "#4B8B32",
        backgroundColor: "#4B8B32 ",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-8 bg-white rounded-md shadow-lg space-y-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-yellow-100 text-center p-4 rounded-md shadow-xl">
          <h3 className="text-xl font-bold">TOTAL VENDU</h3>
          <p className="text-3xl font-semibold">34</p>
        </div>
        <div className="bg-[#4B8B32]  text-white text-center p-4 rounded-md shadow-xl">
          <h3 className="text-xl font-bold">STOCK ACTUEL</h3>
          <p className="text-3xl font-semibold">14</p>
        </div>
        <div className="bg-yellow-400 text-center p-4 rounded-md shadow-xl">
          <h3 className="text-xl font-bold">COMMANDE</h3>
          <p className="text-3xl font-semibold">50</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-4">ARTICLE VENDU</h4>
          <Line data={soldData} options={options} />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">PREVISION</h4>
          <Line data={forecastData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default EtatStock;
