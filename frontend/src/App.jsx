import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [proof, setProof] = useState(null);
  const [proofHistory, setProofHistory] = useState([]);
  const [search, setSearch] = useState("");

  const generateProof = (userId) => {
    const hash = btoa(userId + Date.now()).slice(0, 16);
    const timestamp = new Date().toLocaleString();

    return {
      user: userId,
      hash,
      status: "Verified",
      time: timestamp,
    };
  };

  const handleDelete = () => {
    setLoading(true);
    setResponse("");

    setTimeout(() => {
      if (userId.trim() === "") {
        setResponse("⚠️ Please enter a valid User ID");
      } else {
        const message = `User ${userId} deleted`;
        setResponse(message);

        setLogs((prev) => [message, ...prev]);

        const proofData = generateProof(userId);
        setProof(proofData);
        setProofHistory((prev) => [proofData, ...prev]);
      }

      setLoading(false);
    }, 1000);
  };

  const filteredLogs = logs.filter((log) =>
    log.toLowerCase().includes(search.toLowerCase())
  );

  const clearLogs = () => setLogs([]);

  // 🔥 Chart Data Processing
  const userCounts = {};
  logs.forEach((log) => {
    const user = log.split(" ")[1];
    userCounts[user] = (userCounts[user] || 0) + 1;
  });

  const chartData = Object.keys(userCounts).map((user) => ({
    user,
    count: userCounts[user],
  }));

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">VeriUnlearn</h2>
      </div>

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">

        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">

          {/* Delete */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Delete User</h2>

            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <button
              onClick={handleDelete}
              className="bg-[#8458a1] text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>

          {/* Logs */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">Logs</h2>
              <button onClick={clearLogs} className="text-red-500 text-sm">
                Clear
              </button>
            </div>

            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="max-h-40 overflow-y-auto">
              {filteredLogs.map((log, i) => (
                <p key={i} className="text-sm border-b py-1">{log}</p>
              ))}
            </div>
          </div>

          {/* Proof */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Proof</h2>

            {proof ? (
              <div className="text-sm space-y-2">
                <p>User: {proof.user}</p>
                <p>Hash: {proof.hash}</p>
                <p>{proof.time}</p>
              </div>
            ) : (
              <p>No proof yet</p>
            )}
          </div>

        </div>

        {/* Chart Section */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Delete Activity Chart</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="user" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default App;