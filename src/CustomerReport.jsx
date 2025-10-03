import React, { useState, useEffect } from "react";

export default function CustomerReport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal

  // Generate random date in the last 12 months
  const getRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);
    const end = new Date();
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    return randomDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Generate random products
  const generateRandomProducts = (count = 10) => {
    const productNames = [
      "Mobile",
      "Laptop",
      "Fridge",
      "Washing Machine",
      "TV",
      "AC",
      "Microwave",
      "Bike",
      "Camera",
      "Fan",
    ];

    return Array.from({ length: count }, (_, index) => {
      const totalLoan = Math.floor(Math.random() * 100000) + 5000;
      const totalInstallments = Math.floor(Math.random() * 24) + 1;
      const monthlyPayment = Math.floor(totalLoan / totalInstallments);

      // Generate installment details
      const installments = Array.from({ length: totalInstallments }, (_, i) => {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + i);
        return {
          month: dueDate.toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          }),
          payment: monthlyPayment,
          status: i < Math.floor(Math.random() * totalInstallments) ? "Paid" : "Pending",
        };
      });

      const paidInstallments = installments.filter(
        (ins) => ins.status === "Paid"
      ).length;

      const installmentPaid = paidInstallments * monthlyPayment;
      const remainingBalance = totalLoan - installmentPaid;

      return {
        sno: index + 1,
        product: productNames[Math.floor(Math.random() * productNames.length)],
        totalLoan,
        installmentPaid,
        remainingBalance,
        totalInstallments,
        installmentsPaid: paidInstallments,
        installments,
        saleDate: getRandomDate(),
      };
    });
  };

  useEffect(() => {
    setProducts(generateRandomProducts());
  }, []);

  // Filter by product name or sno
  const filteredProducts = products.filter(
    (p) =>
      p.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sno.toString().includes(searchQuery)
  );

  // Only 2 rows in table
  const displayedProducts = filteredProducts.slice(0, 2);

  return (
    <div className="container-fluid mt-4">
      <h2 className="fw-bold mb-3">Customer Report</h2>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Product Name or S.No..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Cards Section */}
      {searchQuery && filteredProducts.length > 0 && (
        <div className="row mb-4">
          {filteredProducts.slice(0, 3).map((product) => (
            <div className="col-md-4 mb-3" key={product.sno}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    {product.product} (#{product.sno})
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Total Loan:</strong>{" "}
                    {product.totalLoan.toLocaleString()} PKR
                  </p>
                  <p className="card-text mb-1">
                    <strong>Paid:</strong>{" "}
                    {product.installmentPaid.toLocaleString()} PKR
                  </p>
                  <p className="card-text mb-1">
                    <strong>Remaining:</strong>{" "}
                    {product.remainingBalance.toLocaleString()} PKR
                  </p>
                  <p className="card-text mb-1">
                    <strong>Installments:</strong>{" "}
                    {product.installmentsPaid}/{product.totalInstallments}{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      View
                    </span>
                  </p>
                  <p className="card-text">
                    <strong>Sale Date:</strong> {product.saleDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Product</th>
              <th>Total Loan (PKR)</th>
              <th>Installment Paid (PKR)</th>
              <th>Remaining Balance (PKR)</th>
              <th>Installments</th>
              <th>Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <tr key={product.sno}>
                  <td>{product.sno}</td>
                  <td>{product.product}</td>
                  <td>{product.totalLoan.toLocaleString()}</td>
                  <td>{product.installmentPaid.toLocaleString()}</td>
                  <td>{product.remainingBalance.toLocaleString()}</td>
                  <td>
                    {product.installmentsPaid}/{product.totalInstallments}{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      View
                    </span>
                  </td>
                  <td>{product.saleDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Installments */}
    {/* Modal for Installments */}
{selectedProduct && (
  <div
    className="modal show d-block"
    tabIndex="-1"
    role="dialog"
    style={{ background: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Paid Installments - {selectedProduct.product} (#{selectedProduct.sno})
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setSelectedProduct(null)}
          ></button>
        </div>
        <div className="modal-body">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Month</th>
                <th>Payment (PKR)</th>
              </tr>
            </thead>
            <tbody>
              {selectedProduct.installments
                .filter((ins) => ins.status === "Paid") // ✅ Only show Paid
                .map((ins, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ins.month}</td>
                    <td>{ins.payment.toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setSelectedProduct(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
