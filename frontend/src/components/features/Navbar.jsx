import AuthApi from "@/api/auth";
import { clearUser } from "@/redux/auth/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";

import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";

export default function Navbar() {
  const { logOut } = new AuthApi();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = async (name, path) => {
    setIsOpen(false); // close mobile menu

    if (name === "Logout") {
      setIsLoading(true);
      try {
        const response = await logOut();
        if (response.success) {
          toast.success(response?.message ?? "User Logout Successfully");
          dispatch(clearUser());
        } else {
          toast.error(response.message ?? "Error While user logout");
        }
      } catch (error) {
        toast.error(error?.message ?? "Error while user logout");
      } finally {
        setIsLoading(false);
      }
      navigate("/login");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Profile", path: "/profile", icon: <FaRegUserCircle size={24} /> },
    { name: "Logout", path: "/logout", icon: <IoIosLogOut size={24} /> },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="mx-auto flex items-center justify-between p-4 max-w-7xl">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <Link to="/" className="text-xl font-bold text-primary">
            Chat App
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={(e) => {
                  if (link.name === "Logout") {
                    e.preventDefault(); // stop default navigation
                    handleLinkClick(link.name, link.path);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="text-gray-700 hover:text-black transition-colors duration-200"
              >
                <div className="flex gap-1  items-center text-lg">
                  <span>{link?.icon}</span>
                  <span>{link.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <IoMdClose size={24} className="cursor-pointer" />
          ) : (
            <GiHamburgerMenu size={24} className="cursor-pointer" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-sm border-t">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={(e) => {
                  if (link.name === "Logout") {
                    e.preventDefault();
                    handleLinkClick(link.name, link.path);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="block text-gray-700 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
