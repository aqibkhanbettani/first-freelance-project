// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaArrowRight, FaTrash, FaPenToSquare } from "react-icons/fa6";

// function Customers() {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchField, setSearchField] = useState("sno"); // default ID search
//   const [customers, setCustomers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const rowsPerPage = 6;

//   // Generate random customers
//   const generateRandomCustomers = (count = 100) => {
//     const names = [
//       "Ali Khan", "Sara Ahmed", "Usman Malik", "Ayesha Noor",
//       "Bilal Hussain", "Fatima Tariq", "Zain Sheikh", "Hira Qureshi",
//       "Omar Raza", "Nida Hassan"
//     ];
//     return Array.from({ length: count }, (_, index) => ({
//       sno: index + 1,
//       name: names[Math.floor(Math.random() * names.length)],
//       phone: `03${Math.floor(100000000 + Math.random() * 900000000)}`,
//       cnic: `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(
//         1000000 + Math.random() * 9000000
//       )}-${Math.floor(1 + Math.random() * 9)}`,
//       address: `Street ${Math.floor(Math.random() * 20)}, City ${Math.floor(
//         Math.random() * 10
//       )}`,
//       createdAt: new Date(
//         Date.now() - Math.floor(Math.random() * 10000000000)
//       ).toLocaleDateString(),
//     }));
//   };

//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers"));
//     if (savedCustomers && savedCustomers.length > 0) {
//       setCustomers(savedCustomers);
//     } else {
//       const generated = generateRandomCustomers();
//       setCustomers(generated);
//       localStorage.setItem("customers", JSON.stringify(generated));
//     }
//   }, []);

//   // Delete handler
//   const handleDelete = (sno) => {
//     if (window.confirm("Are you sure you want to delete this customer?")) {
//       const updated = customers.filter((c) => c.sno !== sno);
//       setCustomers(updated);
//       localStorage.setItem("customers", JSON.stringify(updated));
//     }
//   };

//   // 🔍 Search logic with field selection
//   const filteredCustomers = customers.filter((c) => {
//     if (!searchQuery) return true;

//     const query = searchQuery.toLowerCase();

//     switch (searchField) {
//       case "sno":
//         return c.sno.toString() === query; // exact match for ID
//       case "name":
//         return c.name.toLowerCase().includes(query);
//       case "phone":
//         return c.phone.includes(query);
//       case "cnic":
//         return c.cnic.includes(query);
//       default:
//         return true;
//     }
//   });

//   const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const displayedCustomers = filteredCustomers.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );

//   return (
//     <div className="container-fluid mt-4">
//       <div className="row align-items-center mb-4">
//         <div className="col-9">
//           <h1 className="fw-bold">Customers</h1>
//         </div>
//         <div className="col-3 text-end">
//           <Link to="/newcustamer" className="btn btn-dark">
//             + Add Customer
//           </Link>
//         </div>
//       </div>

//       {/* 🔍 Search Box + Dropdown */}
//       <div className="row mb-3">
//         <div className="col-md-9">
//           <input
//             type="text"
//             className="form-control"
//             placeholder={`Search by ${searchField.toUpperCase()}...`}
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value.trim());
//               setCurrentPage(1);
//             }}
//           />
//         </div>
//         <div className="col-md-3">
//           <select
//             className="form-select"
//             value={searchField}
//             onChange={(e) => setSearchField(e.target.value)}
//           >
//             <option value="sno">ID</option>
//             <option value="name">Name</option>
//             <option value="phone">Phone</option>
//             <option value="cnic">CNIC</option>
//           </select>
//         </div>
//       </div>

//       <div className="text-center mt-2">
//         Page {currentPage} of {totalPages} | Total Records:{" "}
//         {filteredCustomers.length}
//       </div>

//       <div className="table-responsive">
//         <table className="table table-bordered table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>CNIC</th>
//               <th>Address</th>
//               <th>Created At</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedCustomers.length > 0 ? (
//               displayedCustomers.map((c) => (
//                 <tr key={c.sno}>
//                   <td>{c.sno}</td>
//                   <td>{c.name}</td>
//                   <td>{c.phone}</td>
//                   <td>{c.cnic}</td>
//                   <td>{c.address}</td>
//                   <td>{c.createdAt}</td>
//                   <td className="text-center">
//                     <FaPenToSquare
//                       className="me-3 text-primary"
//                       size={20}
//                       style={{ cursor: "pointer" }}
//                       title="Edit"
//                       onClick={() => navigate(`/update/${c.sno}`)}
//                     />
//                     <FaTrash
//                       className="text-danger"
//                       size={20}
//                       style={{ cursor: "pointer" }}
//                       title="Delete"
//                       onClick={() => handleDelete(c.sno)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No customers found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="row align-items-center mt-3">
//         <div className="col-6">
//           <button
//             className="btn btn-dark"
//             onClick={() =>
//               currentPage > 1 && setCurrentPage(currentPage - 1)
//             }
//             disabled={currentPage === 1}
//           >
//             <FaArrowLeft style={{ marginRight: "5px" }} /> Prev
//           </button>
//         </div>
//         <div className="col-6 text-end">
//           <button
//             className="btn btn-dark"
//             onClick={() =>
//               currentPage < totalPages && setCurrentPage(currentPage + 1)
//             }
//             disabled={currentPage === totalPages}
//           >
//             Next <FaArrowRight style={{ marginLeft: "5px" }} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Customers;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaTrash, FaPenToSquare } from "react-icons/fa6";
import axios from "axios";

function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rowsPerPage = 6;

  // ✅ Fetch customers from backend (with pagination)
  const fetchCustomers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/customers?page=${page}&limit=${rowsPerPage}`
      );
      const { success, data } = response.data;

      if (success) {
        setCustomers(data.customers || []);
        setTotalCustomers(data.total || 0);
      } else {
        setError("Failed to fetch customers.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page changes
  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  // 🗑️ Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/api/customers/${id}`);
      // Re-fetch after deletion
      fetchCustomers(currentPage);
    } catch (err) {
      console.error(err);
      alert("Failed to delete customer.");
    }
  };

  // 🔍 Search (client-side for now)
  const filteredCustomers = customers.filter((c) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    switch (searchField) {
      case "id":
        return c.id.toString() === query;
      case "name":
        return c.name.toLowerCase().includes(query);
      case "phone":
        return c.phone.includes(query);
      case "cnic":
        return c.cnic.includes(query);
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(totalCustomers / rowsPerPage);

  if (loading)
    return <div className="text-center mt-5">Loading customers...</div>;
  if (error)
    return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container-fluid mt-4">
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

      {/* 🔍 Search Box + Dropdown */}
      <div className="row mb-3">
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            placeholder={`Search by ${searchField.toUpperCase()}...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value.trim());
            }}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="phone">Phone</option>
            <option value="cnic">CNIC</option>
          </select>
        </div>
      </div>

      {/* 🧮 Customers count info */}
      <div className="fw-semibold mb-2 fs-7">
        Showing {customers.length} customers out of {totalCustomers}
      </div>

      {/* 🧾 Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>CNIC</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "middle" }}>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.cnic}</td>
                  <td style={{ whiteSpace: "pre-line" }}>{c.address}</td>
                  <td className="text-center">
                    <FaPenToSquare
                      className="me-3 text-primary"
                      size={20}
                      style={{ cursor: "pointer" }}
                      title="Edit"
                      onClick={() => navigate(`/update/${c.id}`)}
                    />
                    <FaTrash
                      className="text-danger"
                      size={20}
                      style={{ cursor: "pointer" }}
                      title="Delete"
                      onClick={() => handleDelete(c.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div className="row align-items-center mt-3">
        <div className="col-md-4">
          <button
            className="btn btn-dark"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaArrowLeft style={{ marginRight: "5px" }} /> Prev
          </button>
        </div>

        <div className="col-md-4 text-center fw-semibold">
          Page {currentPage} out of {totalPages || 1}
        </div>

        <div className="col-md-4 text-end">
          <button
            className="btn btn-dark"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next <FaArrowRight style={{ marginLeft: "5px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customers;
