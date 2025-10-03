import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTrash,
  FaPenToSquare,
  FaRotateLeft, // ✅ Reset Icon
} from "react-icons/fa6";

function Products() {
  const [products, setProducts] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["Electronics", "Appliances", "Accessories"];
  const rowsPerPage = 5;

  // Generate random products
  const generateRandomProducts = (count = 1000) => {
    const productNames = [
      "Laptop",
      "Phone",
      "Tablet",
      "Headphones",
      "Monitor",
      "Keyboard",
      "Mouse",
      "Camera",
      "Printer",
      "Smartwatch",
    ];

    return Array.from({ length: count }, (_, index) => {
      const name = productNames[Math.floor(Math.random() * productNames.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const price = Math.floor(Math.random() * 50000) + 1000;
      const stock = Math.floor(Math.random() * 100) + 1;
      const sold = Math.floor(Math.random() * stock);
      const cost = Math.floor(price * 0.7);
      const profit = (price - cost) * sold;
      const createdAt = new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      );

      return {
        id: index + 1,
        sno: index + 1,
        name,
        category,
        stock,
        sold,
        cost,
        price,
        profit,
        createdAt,
      };
    });
  };

  useEffect(() => {
    setProducts(generateRandomProducts());
  }, []);

  // Format date
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // ✅ Reset Filters
  const handleReset = () => {
    setNameFilter("");
    setCategoryFilter("");
    setMonthFilter("");
    setDateFilter("");
    setCurrentPage(1);
  };

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    const matchesMonth =
      monthFilter !== ""
        ? new Date(p.createdAt).getMonth() === Number(monthFilter)
        : true;
    const matchesDate = dateFilter
      ? new Date(p.createdAt).toDateString() ===
        new Date(dateFilter).toDateString()
      : true;

    return matchesName && matchesCategory && matchesMonth && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid mt-4">
      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col-10">
          <h1 className="fw-bold">Products</h1>
        </div>
        <div className="col-2 text-end">
          <Link to="/newOrder" className="btn btn-dark">
            + Add Product
          </Link>
        </div>
      </div>

      {/* ✅ Filters + Reset Button in Top Right */}
      <div className="row g-3 mb-3 align-items-end">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Product Name"
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={monthFilter}
            onChange={(e) => {
              setMonthFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Months</option>
            {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
              <option key={i} value={i}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        {/* Reset Button with Icon */}
        <div className="col-md-2 text-end">
          <button className="btn btn-secondary w-100 d-flex align-items-center justify-content-center"
            onClick={handleReset}>
            <FaRotateLeft className="me-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Page Info */}
      <div className="text-center mb-2">
        Page {currentPage} of {totalPages} | Total Records:{" "}
        {filteredProducts.length}
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Product</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Cost (PKR)</th>
              <th>Price (PKR)</th>
              <th>Profit (PKR)</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((p, idx) => (
                <tr key={p.id}>
                  <td>{startIndex + idx + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.stock}</td>
                  <td>{p.sold}</td>
                  <td>{p.cost.toLocaleString()}</td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>{p.profit.toLocaleString()}</td>
                  <td>{formatDate(p.createdAt)}</td>
                  <td className="text-center">
                    <FaPenToSquare
                      className="me-3 text-primary"
                      size={20}
                      style={{ cursor: "pointer" }}
                      title="Edit"
                      onClick={() => alert(`Edit product ${p.id}`)}
                    />
                    <FaTrash
                      className="text-danger"
                      size={20}
                      style={{ cursor: "pointer" }}
                      title="Delete"
                      onClick={() => handleDelete(p.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="row align-items-center mb-4">
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
            disabled={currentPage === totalPages}
          >
            Next
            <FaArrowRight className="ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
