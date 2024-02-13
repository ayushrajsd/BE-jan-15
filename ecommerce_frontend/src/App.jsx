import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import User from "./pages/User";
import PaginationProvider from "./contexts/PaginationContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AuthProvider from "./contexts/AuthProvider";
import RequireAuth from "./components/RequireAuth";

function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    setShowNavbar(
      location.pathname !== "/signup" && location.pathname !== "/login"
    );
  }, [location]);
  return (
    <AuthProvider>
      <PaginationProvider>
        {showNavbar && <NavBar></NavBar>}
        <Routes>
          <Route path="/" element={<Home></Home>}>
            {" "}
          </Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route element={<RequireAuth></RequireAuth>}>
            <Route path="/cart" element={<Cart></Cart>}></Route>
          </Route>
          <Route
            path="/product/:id"
            element={<ProductDetails></ProductDetails>}
          >
            {" "}
          </Route>
          <Route path="/user" element={<User></User>}>
            {" "}
          </Route>
          <Route path="/home" element={<Navigate to="/"></Navigate>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}>
            {" "}
          </Route>
        </Routes>
      </PaginationProvider>
    </AuthProvider>
  );
}

export default App;
