import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
function App() {
  const { user, authCheck } = useAuthStore();

  console.log("current user", user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to={"/login"} /> : <HomePage />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />

        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
