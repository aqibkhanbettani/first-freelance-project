import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTrash,
  FaPenToSquare,
  FaRotateLeft,
} from "react-icons/fa6";

function Products() {
  const [products, setProducts] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const categories = ["Electronics", "Appliances", "Accessories"];
  const rowsPerPage = 5;

  // Generate random products
  const generateRandomProducts = (count = 100) => {
    const productNames = [
      "Laptop", "Phone", "Tablet", "Headphones", "Monitor",
      "Keyboard", "Mouse", "Camera", "Printer", "Smartwatch",
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
      return { id: index + 1, name, category, stock, sold, cost, price, profit, createdAt };
    });
  };

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts);
    } else {
      const generated = generateRandomProducts();
      setProducts(generated);
      localStorage.setItem("products", JSON.stringify(generated));
    }
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
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
    }
  };

  // Reset filters
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

  return (
    <div className="container-fluid mt-4">
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

      {/* Filters */}
      <div className="row g-3 mb-3 align-items-end">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Product Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">All Months</option>
            {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <div className="col-md-2 text-end">
          <button className="btn btn-secondary w-100" onClick={handleReset}>
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
              <th>Product</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Profit</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((p, idx) => (
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
                    onClick={() => navigate(`/edit-product/${p.id}`)}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-dark"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft className="me-2" /> Prev
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-dark"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next <FaArrowRight className="ms-2" />
        </button>
      </div>
    </div>
  );
}

export default Products;
