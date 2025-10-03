import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6; // Show 6 per page

  // Generate random customers (1000+ for uncount data demo)
  const generateRandomCustomers = (count = 1000) => {
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

  // Initialize customers
  useEffect(() => {
    setCustomers(generateRandomCustomers());
  }, []);

  // Filter customers by name or sno
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.sno.toString().includes(searchQuery)
  );

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedCustomers = filteredCustomers.slice(
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
        <div className="col-9">
          <h1 className="fw-bold">Customers</h1>
        </div>
        <div className="col-3 text-end">
          <Link to="/newcustamer" className="btn btn-dark">
            + Add Customer
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name or S.No..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to first page after search
          }}
        />
      </div>
   {/* Page Info */}
      <div className="text-center mt-2">
        Page {currentPage} of {totalPages} | Total Records: {filteredCustomers.length}
      </div>
      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
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

      {/* Pagination Buttons */}
      <div className="row align-items-center mt-3">
        <div className="col-6">
          <button
            className="btn btn-dark"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <FaArrowLeft style={{ marginRight: "5px" }} />
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
            <FaArrowRight style={{ marginLeft: "5px" }} />
          </button>
        </div>
      </div>

   
    </div>
  );
}

export default Customers;
