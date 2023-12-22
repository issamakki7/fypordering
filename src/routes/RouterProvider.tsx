import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import Navbar from "../components/Navbar/Navbar";
import { Store } from "../pages/Menu/MenuCart";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import OrderHomePage from "../pages/OrderHomePage/OrderHomePage";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import NotFound404 from "../components/NotFound404/NotFound404";

function RouterProvider() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, [navigate]);

  return (
    <div className="content">
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          {/* This component makes sure that only one route appears at a time */}
          <Route path="/" element={<LoginPage />} />
          {currentUser ? (
            <>
              <Route path="/dashboard" element={<OrderHomePage />} />
              <Route path="/browseWithCart" element={<Store />} />
              <Route path="/review" element={<ReviewPage />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Navigate to="/" />} />
              <Route path="/browseWithCart" element={<Navigate to="/" />} />
              <Route path="/review" element={<Navigate to="/" />} />
            </>
          )}
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </ShoppingCartProvider>
    </div>
  );
}

export default RouterProvider;
