import React, { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [proof, setProof] = useState(null);

  // 🔥 Proof Generator (mock)
  const generateProof = (userId) => {
  const hash = btoa(userId + Date.now()).slice(0, 16); // base64-like hash
  const timestamp = new Date().toLocaleString();

  return {
    user: userId,
    hash: hash,
    status: "Verified",
    time: timestamp,
  };
};

  const handleDelete = async () => {
    setLoading(true);
    setResponse("");

    // 🔴 MOCK BACKEND (replace later)
    setTimeout(() => {
      if (userId.trim() === "") {
        setResponse("⚠️ Please enter a valid User ID");
      } else {
        const message = `✅ User ${userId} successfully deleted`;
        setResponse(message);

        // Add to logs
        setLogs((prevLogs) => [message, ...prevLogs]);

        // Generate proof
        const proofData = generateProof(userId);
        setProof(proofData);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">VeriUnlearn</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-purple-400">Dashboard</li>
          <li className="cursor-pointer hover:text-purple-400">Delete User</li>
          <li className="cursor-pointer hover:text-purple-400">Proofs</li>
          <li className="cursor-pointer hover:text-purple-400">Logs</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">

          {/* Delete User Card */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Delete User</h2>

            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <button
              onClick={handleDelete}
              className="bg-[#8458a1] hover:opacity-90 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>

          {/* Proof Card */}
          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
  <h2 className="font-semibold mb-3">Verification Proof</h2>

  {proof ? (
    <div className="text-sm space-y-2">

      <p>
        <span className="font-medium">User ID:</span> {proof.user}
      </p>

      <p>
        <span className="font-medium">Hash:</span>
        <br />
        <span className="text-xs text-gray-600 break-all">
          {proof.hash}
        </span>
      </p>

      <p>
        <span className="font-medium">Timestamp:</span> {proof.time}
      </p>

      <p className="text-green-600 font-medium">
        ✔ {proof.status}
      </p>

    </div>
  ) : (
    <p className="text-gray-600">No proof generated yet</p>
  )}
</div>

          {/* Logs Card */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Logs</h2>

            {logs.length === 0 ? (
              <p className="text-gray-600">No logs yet</p>
            ) : (
              <ul className="space-y-2">
                {logs.map((log, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 border-b pb-1"
                  >
                    {log}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Response Section */}
        <div className="mt-6 bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Response</h2>

          {loading ? (
            <p className="text-[#8458a1] animate-pulse">Processing...</p>
          ) : (
            <p>{response}</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;