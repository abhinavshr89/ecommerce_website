import { X } from "lucide-react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const ResponsiveNavbar = ({ isActive, setActive }) => {
  const { user, logout } = useUserStore();
  const handleLinkClick = () => {
    setActive(!isActive);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setActive(!isActive);
    logout();
  };

  return (
    <div
      className={`xl:hidden fixed h-screen w-full text-white z-30 mt-10 p-10 inset-0 top-[-40px] transition-transform duration-300 ${
        isActive ? "translate-x-0" : "translate-x-full"
      } backdrop-blur-3xl bg-gray-900`}
    >
      <X
        size={40}
        onClick={() => setActive(!isActive)}
        className="active:scale-95 ml-auto active:text-emerald-500 transition-transform duration-100"
      />

      {
        user && 
      <div className="header flex justify-between items-center">
        <Link to="/profile" onClick={handleLinkClick} className="flex-grow">
          <div className="active:scale-95  w-full justify-between active:text-emerald-500 transition-transform duration-100 flex gap-4">
            <h1>My Profile</h1>
          </div>
        </Link>

       
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={user?.profilePicture} />
        </div>
      </div>
      }
      <div className="header flex justify-between items-center">
        <Link to="/" onClick={handleLinkClick}>
          <h1 className="active:scale-95 active:text-emerald-500 transition-transform duration-100">
            Home
          </h1>
        </Link>
      </div>
      <Link to="/cart" onClick={handleLinkClick}>
        <div className="header active:scale-95 active:text-emerald-500 transition-transform duration-100">
          <h1>Cart</h1>
        </div>
      </Link>
      {!user ? (
        <>
          <Link to="/signup" onClick={handleLinkClick}>
            <div className="header active:scale-95 active:text-emerald-500 transition-transform duration-100">
              <h1>SignUp</h1>
            </div>
          </Link>
          <Link to="/login" onClick={handleLinkClick}>
            <div className="header active:scale-95 active:text-emerald-500 transition-transform duration-100">
              <h1>Login</h1>
            </div>
          </Link>
        </>
      ) : (
        <>
          <div
            className="header cursor-pointer active:scale-95 active:text-emerald-500 transition-transform duration-100"
            onClick={handleLogout}
          >
            <span className="">Log Out</span>
          </div>
          {user.role === "admin" && (
            <Link to="/secret-dashboard" onClick={handleLinkClick}>
              <div className="header active:scale-95 active:text-emerald-500 transition-transform duration-100">
                <h1>Dashboard</h1>
              </div>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default ResponsiveNavbar;
