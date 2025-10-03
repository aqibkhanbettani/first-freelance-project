import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaBox, FaUsers, FaMoneyBill, FaChartBar } from "react-icons/fa";
import "./App.css";

export default function Sidebar() {
  const [showReportsMenu, setShowReportsMenu] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Products", icon: <FaBox />, path: "/products" },
    { name: "Customers", icon: <FaUsers />, path: "/customers" },
    { name: "Sala", icon: <FaMoneyBill />, path: "/sala" },
    { name: "Reports", icon: <FaChartBar />, path: "/reports", isParent: true },
  ];

  const reportSubMenu = [
    { name: "Business", path: "reports" },
    { name: "Customer", path: "CustomerReport" },
  ];

  return (
    <div className="sidebar bg-white text-black">
      <h1 className="sidebar-title fs-5 text-center">Installment Shop</h1>
      <nav className="menu">
        {menuItems.map((item) =>
          item.isParent ? (
            <div
              key={item.path}
              className="submenu-container"
              onMouseEnter={() => setShowReportsMenu(true)}
              onMouseLeave={() => setShowReportsMenu(false)}
            >
              <Link
                to={item.path}
                className="menu-link d-flex align-items-center gap-2 px-3 py-2 rounded"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>

              {showReportsMenu && (
                <div className="submenu ps-4">
                  {reportSubMenu.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="d-block px-3 py-2 rounded submenu-link"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className="menu-link d-flex align-items-center gap-2 px-3 py-2 rounded"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
