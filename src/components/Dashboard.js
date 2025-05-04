import React from 'react';
import './Dashboard.css';
import {useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  const handleCardClick = (category) => {
    localStorage.setItem("selectedCategory", category);
    window.location.href = `/${category}`;
  };
  
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <img src="/logo.jpg" alt="Logo" />
          <h3>NEITRAM CONSTRUCTION MANAGEMENT</h3>
        </div>
        <nav className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Reports</a>
          <a href="#">Materials</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      <main className="main-content">
        <div className="card-container">
          <div className="card-container">
            <div className="card" onClick={() => handleCardClick("civil")}>CIVIL</div>
            <div className="card" onClick={() => handleCardClick("mechanical")}>MECHANICAL</div>
            <div className="card" onClick={() => handleCardClick("electrical")}>ELECTRICAL</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
