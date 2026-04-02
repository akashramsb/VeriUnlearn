import React from "react";

function App() {
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

        {/* Grid Layout */}
        <div className="grid grid-cols-3 gap-6">

          {/* Delete User Card */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Delete User</h2>
            <input
              type="text"
              placeholder="Enter User ID"
              className="w-full p-2 border rounded mb-3"
            />
            <button className="bg-[#8458a1] hover:opacity-90 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>

          {/* Proof Section */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Proof</h2>
            <p className="text-gray-600">Merkle proof will appear here</p>
          </div>

          {/* Logs Section */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Logs</h2>
            <p className="text-gray-600">System logs will appear here</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;