import React from "react";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "#111",
        color: "#fff",
        padding: "20px"
      }}>
        <h2>Unlearning System</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Dashboard</li>
          <li>Delete User</li>
          <li>Proofs</li>
          <li>Logs</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: "20px",
        background: "#f5f5f5"
      }}>
        <h1>Dashboard</h1>
        <p>Welcome to Machine Unlearning System</p>
      </div>

    </div>
  );
}

export default App;