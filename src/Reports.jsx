import React, { useState } from "react";
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
import "./Reports.css";

// ✅ Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const cards = [
    { title: "Total Installments", value: "2,50,000 PKR" },
    { title: "Stock", value: "1,80,000 PKR" },
    { title: "Debit", value: "50,000 PKR" },
    { title: "Bank Balance", value: "70,000 PKR" },
    { title: "Cash in Hand", value: "30,000 PKR" },
    { title: "Expenses", value: "40,000 PKR" },
    { title: "Profit / Net", value: "90,000 PKR" },
    { title: "Loan on Customers", value: "1,20,000 PKR" },
  ];

  // ✅ Bar Chart Data (Income vs Expenses)
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [1225, 1928, 150, 2000, 5000, 300],
        backgroundColor: "rgba(11, 236, 236, 0.86)", // aqua
      },
      {
        label: "Expenses",
        data: [8000, 1040, 1020, 1500, 100, 200],
        backgroundColor: "rgba(221, 18, 28, 0.7)", // red
      },
    ],
  };

  // ✅ Bar Chart Options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: "Income vs Expenses",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1000 },
      },
    },
  };

  return (
    <div className="dashboard-container p-4">
      <h2 className="dashboard-title mb-4">Reports</h2>

      {/* Header with dropdown */}
      <div className="row align-items-center mb-4">
        <div className="col-9">
          <h1 className="fw-bold">Business</h1>
        </div>
        <div className="col-3 text-end">
          <select className="form-select">
            <option value="">Select Month</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container">
        <div className="row g-3">
          {cards.map((card, index) => (
            <div className="col-md-3 col-sm-6" key={index}>
              <div
                className="custom-card p-3 rounded"
                style={{ backgroundColor: "#fff", boxShadow: "none" }}
              >
                <h6 className="fw-bold">{card.title}</h6>
                <p className="mb-0">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Graphs */}
      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <div
            className="card p-3"
            style={{ backgroundColor: "#fff", boxShadow: "none" }}
          >
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card p-3"
            style={{ backgroundColor: "#fff", boxShadow: "none" }}
          >
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
