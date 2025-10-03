import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaPenToSquare,
  FaArrowLeft,
  FaArrowRight,
  FaRotateLeft, // ✅ Reset Icon
} from "react-icons/fa6";

function Sala() {
  const [sales, setSales] = useState([
    {
      id: 1,
      customer: "John Doe",
      category: "Electronics",
      product: "Laptop",
      price: 1000,
      paid: 600,
      balance: 400,
      status: "Pending",
      createdAt: "2025-10-01",
    },
    {
      id: 2,
      customer: "Jane Smith",
      category: "Clothing",
      product: "T-Shirt",
      price: 50,
      paid: 50,
      balance: 0,
      status: "Paid",
      createdAt: "2025-10-02",
    },
    {
      id: 3,
      customer: "Michael Lee",
      category: "Furniture",
      product: "Chair",
      price: 150,
      paid: 100,
      balance: 50,
      status: "Pending",
      createdAt: "2025-10-02",
    },
  ]);

  const [filters, setFilters] = useState({
    customer: "",
    category: "",
    product: "",
    date: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Handle input changes
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // ✅ Reset to page 1 when filters change
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      customer: "",
      category: "",
      product: "",
      date: "",
    });
    setCurrentPage(1); // ✅ Reset to first page
  };

  // Delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      setSales(sales.filter((sale) => sale.id !== id));
    }
  };

  // Filter logic
  const filteredSales = sales.filter((sale) => {
    return (
      sale.customer.toLowerCase().includes(filters.customer.toLowerCase()) &&
      sale.category.toLowerCase().includes(filters.category.toLowerCase()) &&
      sale.product.toLowerCase().includes(filters.product.toLowerCase()) &&
      (filters.date ? sale.createdAt === filters.date : true)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredSales.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredSales.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col-9">
          <h1 className="fw-bold">Sales</h1>
        </div>
        <div className="col-3 text-end">
          <Link to="/newsala" className="btn btn-dark">
            + Add Sale
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-3">
        <div className="col-md-2">
          <input
            type="text"
            name="customer"
            value={filters.customer}
            onChange={handleChange}
            className="form-control"
            placeholder="Filter by Customer"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="form-control"
            placeholder="Filter by Category"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="product"
            value={filters.product}
            onChange={handleChange}
            className="form-control"
            placeholder="Filter by Product"
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-secondary w-100 d-flex align-items-center justify-content-center"
            onClick={resetFilters}
          >
            <FaRotateLeft className="me-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Customer Name</th>
              <th>Category</th>
              <th>Product Name</th>
              <th>Sale Price</th>
              <th>Paid Amount</th>
              <th>Remaining Balance</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((sale, index) => (
                <tr key={sale.id}>
                  <td>{indexOfFirstRecord + index + 1}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.category}</td>
                  <td>{sale.product}</td>
                  <td>${sale.price}</td>
                  <td>${sale.paid}</td>
                  <td>${sale.balance}</td>
                  <td>{sale.status}</td>
                  <td>{sale.createdAt}</td>
                  <td className="text-center">
                    {/* ✅ Edit Button Links to Detail Page */}
                    <Link to={`/sala/${sale.id}`} title="Edit">
                      <FaPenToSquare
                        className="me-3 text-primary"
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                    <FaTrash
                      className="text-danger"
                      size={20}
                      style={{ cursor: "pointer" }}
                      title="Delete"
                      onClick={() => handleDelete(sale.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="row align-items-center mt-3">
        <div className="col-6">
          <button
            className="btn btn-dark"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <FaArrowLeft className="me-2" />
            Prev
          </button>
        </div>
        <div className="col-6 text-end">
          <button
            className="btn btn-dark"
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
            <FaArrowRight className="ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sala;
