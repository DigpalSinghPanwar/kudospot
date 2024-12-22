import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getKudosAnalytics, getLeaderboard } from "../utils/api";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const userId = sessionStorage.getItem("userId");

  const [barData, setBarData] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barResponse = await getKudosAnalytics(userId);
        setBarData(barResponse?.data?.response);

        const leaderboardResponse = await getLeaderboard();
        setLeaderboard(leaderboardResponse?.data?.leaderboard);
      } catch (error) {
        toast.error("Error fetching analytics data");
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: barData.map((item) => item.badge),
    datasets: [
      {
        label: "Kudos Sent",
        data: barData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Kudos Sent Analysis",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Badge Type",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      <div className="mb-10">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Rank</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Total Kudos</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.totalKudos}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsPage;
