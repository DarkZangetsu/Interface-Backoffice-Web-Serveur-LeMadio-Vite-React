import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PieChart, Pie, Cell, Sector } from "recharts";
import { BarChart, Bar, LabelList } from "recharts";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const salesDataByMonth = {
  Août: [
    { name: "Tana", value: 75, color: "#4B8B32" },
    { name: "Tamatave", value: 32, color: "#FFC107" },
    { name: "Antsirabe", value: 110, color: "#FF5722" },
  ],
  Juillet: [
    { name: "Tana", value: 55, color: "#4B8B32" },
    { name: "Tamatave", value: 35, color: "#FFC107" },
    { name: "Antsirabe", value: 15, color: "#FF5722" },
  ],
};

const salesData = [
  { name: "Mar", Product1: 60 },
  { name: "Avr", Product1: 90 },
  { name: "Mai", Product1: 60 },
  { name: "Juin", Product1: 80 },
  { name: "Juil", Product1: 85 },
  { name: "Août", Product1: 80 },
];

const topSellersData = [
  { name: "R10", value: 5 },
  { name: "R02", value: 8 },
  { name: "R16", value: 12 },
  { name: "R11", value: 18 },
  { name: "R25", value: 25 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} Ar`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("Août");

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const currentMonthData = salesDataByMonth[selectedMonth] || [];
  const totalSales = currentMonthData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Sales chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold">Ventes Mensuels</h3>
                <p className="text-3xl font-bold text-[#4B8B32]">
                  26 110 000 Ar
                </p>
                <p className="text-sm text-gray-500">Revendeurs + show room</p>
              </div>
              <button className="text-[#4B8B32]">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Product1"
                  stroke="#4B8B32"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Lower section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Pie chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold">Ventes du mois</h3>
                  <p className="text-3xl font-bold">{totalSales * 100000} Ar</p>
                  <p className="text-sm text-[#4B8B32]">Par région</p>
                </div>
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={currentMonthData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      {currentMonthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {currentMonthData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Top 5 Revendeur</h3>
                <button className="text-[#4B8B32]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">Mois d août 2024</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart layout="vertical" data={topSellersData}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4B8B32">
                    <LabelList dataKey="value" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#4B8B32] mr-2"></div>
                  <span>LeMadio</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
