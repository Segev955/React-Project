import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import LoginComp from "./pages/login";
import { Routes, Route, NavLink  } from "react-router-dom";
import RegisterComp from "./pages/register";
import CategoriesComp from "./pages/admins/categories";
import ProtectedRoute from "./pages/ProtectedRoute";
import CustomersComp from "./pages/admins/customers";
import MyAccountComp from "./pages/customers/myAccount";
import LogoutComp from "./pages/logout";
import MyOrdersComp from "./pages/customers/myOrders";
import ProductsComp from "./pages/customers/products";
import ManageProductsComp from "./pages/admins/mProducts";
import StatisticsComp from "./pages/admins/statistics";
import { Justify } from "react-bootstrap-icons";
import AdminRoute from "./pages/adminRoute";

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });

  return (
    <>
    <div className="d-flex align-items-center justify-content-center text-center">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user ? (
              user.admin ? (
                <div className="text-center mb-4">
                  Hello, Admin <br />
                  <Nav className="customersNav">
                    <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
                    <Nav.Link as={NavLink} to="/manageproducts">Products</Nav.Link>
                    <Nav.Link as={NavLink} to="/customers">Customers</Nav.Link>
                    <Nav.Link as={NavLink} to="/statistics">Statistics</Nav.Link>
                    <Nav.Link as={NavLink} to="/logout">Log Out</Nav.Link>
                  </Nav>
                </div>
              ) : (
                <div className="text-center mb-4">
                  <Nav className="customersNav">
                    <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                    <Nav.Link as={NavLink} to="/myorders">My Orders</Nav.Link>
                    <Nav.Link as={NavLink} to="/myaccount">My Account</Nav.Link>
                    <Nav.Link as={NavLink} to="/logout">Log Out</Nav.Link>
                  </Nav>
                </div>
              )
            ) : (
              <div></div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
      <div style={{ backgroundColor: "rgb(243, 244, 245)", padding: " 20px" }}>
        <Routes>
          <Route path="/" element={<LoginComp setMainUser={setUser} />} />
          <Route path="/register" element={<RegisterComp />} />
          <Route
            path="/logout"
            element={<LogoutComp setMainUser={setUser} />}
          />
          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/categories" element={<CategoriesComp />} />
            <Route path="/customers" element={<CustomersComp />} />
            <Route path="/manageproducts" element={<ManageProductsComp />} />
            <Route path="/statistics" element={<StatisticsComp />} />
          </Route>
          {/* Customer */}
          <Route element={<ProtectedRoute />}>
            <Route path="/myaccount" element={<MyAccountComp />} />
            <Route path="/myorders" element={<MyOrdersComp />} />
            <Route path="/products" element={<ProductsComp />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
