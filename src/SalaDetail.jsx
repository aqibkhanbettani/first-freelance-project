import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

function SalaDetail() {
  const { id } = useParams();

  const sale = {
    id: id,
    date: "2025-10-01",
    status: "Pending",
    customer: {
      name: "John Doe",
      cnic: "12345-6789012-3",
      phone: "+92-300-1234567",
      address: "123 Main Street, City",
    },
    product: {
      name: "Laptop",
      category: "Electronics",
      price: 100000, // Original Price
      sellingPrice: 120000, // Selling Price
    },
    payment: {
      totalPrice: 120000,
      paidAmount: 60000,
      paymentType: "Installments",
    },
  };

  const remainingAmount = sale.payment.totalPrice - sale.payment.paidAmount;

  const [installments, setInstallments] = useState([
    { id: 1, amount: 20000, date: "2025-10-05", status: "Paid" },
    { id: 2, amount: 20000, date: "2025-11-05", status: "Pending" },
  ]);

  const handleAddInstallment = () => {
    const id = prompt("Enter Installment ID:");
    const amount = prompt("Enter Installment Amount (₨):");
    const date = prompt("Enter Paid Date (YYYY-MM-DD):");
    const status = "Paid";

    if (id && amount && date) {
      const newInstallment = {
        id: Number(id),
        amount: Number(amount),
        date,
        status,
      };
      setInstallments([...installments, newInstallment]);
    } else {
      alert("Please enter valid ID, amount, and date!");
    }
  };

  const paidInstallments = installments.filter((inst) => inst.status === "Paid");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mt-4">
      {/* 🔹 Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Sale Details View</h1>
        <button className="btn btn-outline-secondary btn-sm" onClick={handlePrint}>
          🖨️ Print
        </button>
      </div>

      <div className="row g-4">
        {/* Summary */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold">Summary</h5>
              <p><strong>Sale ID:</strong> {sale.id}</p>
              <p><strong>Sale Date:</strong> {sale.date}</p>
              <p><strong>Status:</strong> {sale.status}</p>
            </div>
          </div>
        </div>

        {/* 💳 Payment */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold">Payment</h5>
              <p><strong>Total Price:</strong> ₨ {sale.payment.totalPrice.toLocaleString()}</p>
              <p><strong>Paid Amount:</strong> ₨ {sale.payment.paidAmount.toLocaleString()}</p>
              <p><strong>Payment Type:</strong> {sale.payment.paymentType}</p>
              <p>
                <strong>Remaining:</strong>{" "}
                <span className="text-danger fw-bold">
                  ₨ {remainingAmount.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 💻 Product */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold">Product</h5>
              <p><strong>Product:</strong> {sale.product.name}</p>
              <p><strong>Category:</strong> {sale.product.category}</p>
              <p><strong>Original Price:</strong> ₨ {sale.product.price.toLocaleString()}</p>
              <p><strong>Selling Price:</strong> <span className="text-success fw-bold">₨ {sale.product.sellingPrice.toLocaleString()}</span></p>
            </div>
          </div>
        </div>

        {/* 👤 Customer */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold">Customer</h5>
              <p><strong>Name:</strong> {sale.customer.name}</p>
              <p><strong>CNIC:</strong> {sale.customer.cnic}</p>
              <p><strong>Phone:</strong> {sale.customer.phone}</p>
              <p><strong>Address:</strong> {sale.customer.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📅 Installment Table */}
      <div className="card shadow-sm border-0 mt-5">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Installment (Paid Only)</h5>
            <button className="btn btn-primary btn-sm" onClick={handleAddInstallment}>
              + Add Installment
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Amount (₨)</th>
                  <th scope="col">Paid Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {paidInstallments.length > 0 ? (
                  paidInstallments.map((inst) => (
                    <tr key={inst.id}>
                      <td>{inst.id}</td>
                      <td>₨ {inst.amount.toLocaleString()}</td>
                      <td>{inst.date}</td>
                      <td><span className="badge bg-success">{inst.status}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No Paid Installments Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-4">
        <Link to="/sala" className="btn btn-dark">
          ⬅ Back to Sales
        </Link>
      </div>
    </div>
  );
}

export default SalaDetail;
