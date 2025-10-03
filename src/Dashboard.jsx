import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [customers, setCustomers] = useState([]);

  // Random summary data
  const income = Math.floor(Math.random() * 100000) + 1000;
  const orders = Math.floor(Math.random() * 5000) + 100;
  const profile = Math.floor(Math.random() * 10000) + 500;
  const expenses = Math.floor(Math.random() * 80000) + 1000;

  // Generate random customers
  const generateRandomCustomers = (count = 10) => {
    const names = [
      "Ali Khan",
      "Sara Ahmed",
      "Usman Malik",
      "Ayesha Noor",
      "Bilal Hussain",
      "Fatima Tariq",
      "Zain Sheikh",
      "Hira Qureshi",
      "Omar Raza",
      "Nida Hassan",
    ];

    return Array.from({ length: count }, (_, index) => {
      const name = names[Math.floor(Math.random() * names.length)];
      const phone = `03${Math.floor(100000000 + Math.random() * 900000000)}`;
      const cnic = `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(
        1000000 + Math.random() * 9000000
      )}-${Math.floor(1 + Math.random() * 9)}`;
      const address = `Street ${Math.floor(Math.random() * 20)}, City ${Math.floor(
        Math.random() * 10
      )}`;
      const createdAt = new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toLocaleDateString();

      return { sno: index + 1, name, phone, cnic, address, createdAt };
    });
  };

  // Load customers
  useEffect(() => {
    setCustomers(generateRandomCustomers());
  }, []);

  // Show only 6 rows
  const displayedCustomers = customers.slice(0, 4);

  // Bar Chart Data (Income vs Expenses)
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

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Income vs Expenses" },
    },
  };

  return (
    <div className="container-fluid mt-4" style={{  background: "linear-gradient(to bottom right, #E9EEF8 0%, rgba(255, 255, 255, 0.9) 100%)",}}>
      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col-10">
          <h1 className="fw-bold">Dashboard</h1>
        </div>
        <div className="col-2 text-end">
          <Link to="/newOrder" className="btn btn-dark">
            + New Order
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        {[
          { title: "Income", value: income },
          { title: "Orders", value: orders },
          { title: "Profile", value: profile },
          { title: "Expenses", value: expenses },
        ].map((card) => (
          <div className="col-md-3" key={card.title}>
            <div className="card text-center p-2" style={{ minHeight: "100px" }}>
              <p className="text-black mb-1">{card.title}</p>
              <p className="fs-5 text-black">
                PKR {card.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Graphs */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="card p-3 mt-4">
        <h5 className="mb-3">Recent Customers</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped" style={{borderRadius:"5px"}}>
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>CNIC</th>
                <th>Address</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.length > 0 ? (
                displayedCustomers.map((customer) => (
                  <tr key={customer.sno}>
                    <td>{customer.sno}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.cnic}</td>
                    <td>{customer.address}</td>
                    <td>{customer.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
