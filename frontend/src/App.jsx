import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useUserStore from "./stores/useUserStore";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import CategoryPage from "./pages/CategoryPage";
import ProductsPage from "./pages/ProductsPage";
import CartsPage from "./pages/CartsPage";
import { useCartStore } from "./stores/useCartStore";
import CartPage from "./pages/CartsPage";

export default function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/secret-dashboard"
          element={
            user && user.role === "admin" ? <AdminPage /> : <Navigate to="/" />
          }
        />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/products/:searchterm" element={<ProductsPage />} />

        <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
      </Routes>
      <Toaster />
    </div>
  );
}
