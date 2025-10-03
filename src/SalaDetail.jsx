import React from "react";
import { useParams, Link } from "react-router-dom";

function SalaDetail() {
  const { id } = useParams(); // get sale id from route param

  // 🔹 Example dummy data for now (you can replace with real data later)
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
      price: 1000,
    },
  };

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-4">Sale Details View</h1>

      <div className="row g-4">
        {/* 1st Card - Summary */}
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

        {/* 2nd Card - Customer Info */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold">Customer Info</h5>
              <p><strong>Name:</strong> {sale.customer.name}</p>
              <p><strong>CNIC:</strong> {sale.customer.cnic}</p>
              <p><strong>Phone:</strong> {sale.customer.phone}</p>
              <p><strong>Address:</strong> {sale.customer.address}</p>
            </div>
          </div>
        </div>

        {/* 3rd Card - Product Info */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold">Product Info</h5>
              <p><strong>Product:</strong> {sale.product.name}</p>
              <p><strong>Category:</strong> {sale.product.category}</p>
              <p><strong>Original Price:</strong> ${sale.product.price}</p>
            </div>
          </div>
        </div>

        {/* 4th Card - Duplicate Customer Info (as requested) */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold">Customer Info (Again)</h5>
              <p><strong>Name:</strong> {sale.customer.name}</p>
              <p><strong>CNIC:</strong> {sale.customer.cnic}</p>
              <p><strong>Phone:</strong> {sale.customer.phone}</p>
              <p><strong>Address:</strong> {sale.customer.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-4">
        <Link to="/sala" className="btn btn-dark">⬅ Back to Sales</Link>
      </div>
    </div>
  );
}

export default SalaDetail;
