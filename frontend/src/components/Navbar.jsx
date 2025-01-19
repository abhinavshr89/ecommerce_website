import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Earth,
  SearchIcon,
  Menu,
} from "lucide-react";

import { Link } from "react-router-dom";
import ResponsiveNavbar from "./ResponsiveNavbar";
import useUserStore from "../stores/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cart } = useCartStore();

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/${search}`);
  };

  return (
    <header className="font-poppins fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex relative justify-between sm:items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex"
          >
            <div className="flex gap-2 items-center justify-center">
              <Earth className="max-sm:hidden" />
              <h1 className="max-sm:hidden"> ShopSphere</h1>
            </div>
          </Link>

          <div className="flex items-center justify-center ">
            <div className="mt-1 relative rounded-md shadow-sm flex">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                required
                className="block w-[80%] px-3 py-2 pl-10 border border-gray-600 
                   shadow-sm
                   placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                   focus:border-emerald-500 sm:text-sm text-black lg:w-[400px] rounded-l-md"
                placeholder="Search..."
              />
              <button
                className="h-full mt-[1px] bg-emerald-300 px-3 py-2 rounded-r-md"
                onClick={handleSearch}
              >
                <SearchIcon
                  className="h-[110] text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {cart.length > 0 && user && (
            <Link
              to={"/cart"}
              className="relative lg:hidden group mt-3 text-gray-300 hover:text-emerald-400 transition duration-300 
            ease-in-out"
            >
              <ShoppingCart
                className="inline-block mr-1 group-hover:text-emerald-400 w-[30px] h-[30px]"
                size={20}
              />
              <span className="hidden sm:inline">Cart</span>
              <span
                className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
                text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out"
              >
                {cart.length}
              </span>
            </Link>
          )}

          <nav className="max-xl:hidden flex items-center gap-4 ">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300
           ease-in-out"
            >
              Home
            </Link>

            {cart.length > 0 && (
              <Link
                to={"/cart"}
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 
              ease-in-out"
              >
                {" "}
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-emerald-400"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                <span
                  className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
                  text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out"
                >
                  {cart.length}
                </span>
              </Link>
            )}

            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
                   transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <>
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
            rounded-md flex items-center transition duration-300 ease-in-out"
                  onClick={handleClick}
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline ml-2">Log Out</span>
                </button>
                {
                  user && 
                <Link to="/profile">
                <div className="w-10 h-10  rounded-full overflow-hidden">
                  <img src={user?.profilePicture} />
                </div>
                </Link>
                }
             
              </>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
                  rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                  rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
          <Menu
            size={40}
            onClick={() => setActive(!active)}
            className="lg:hidden mt-1"
          />
          <ResponsiveNavbar isActive={active} setActive={setActive} />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
