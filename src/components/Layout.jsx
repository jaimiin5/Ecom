/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Heart,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { Menu as HeadlessMenu } from "@headlessui/react";
import { useTheme } from "../context/themeContext";

export default function Layout({
  children,
  cartItemsCount,
  favoritesCount,
  onCartClick,
  onFavoritesClick,
  onSearch,
}) {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header
        className={`
           ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"}
           sticky top-0 z-10 backdrop-blur-md bg-opacity-30 transition-all `}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-2 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </button>
            <Link to="/" className="text-2xl font-bold">
              EcoShop
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link
              to="/"
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search
                  className={`absolute left-2.5 top-2.5 h-4 w-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-400"
                  }`}
                />
                <input
                  type="search"
                  placeholder="Search products..."
                  className={`pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                     ${
                       theme === "dark"
                         ? "bg-zinc-900 text-white border-gray-600"
                         : "bg-white text-gray-900 border-gray-300"
                     }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "dark"
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button onClick={onFavoritesClick} className="relative">
              <Heart className="h-6 w-6" />
              <span className="sr-only">Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button onClick={onCartClick} className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center">
                <User className="h-6 w-6" />
                <span className="sr-only">User menu</span>
              </HeadlessMenu.Button>
              <HeadlessMenu.Items
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-4 py-2 text-sm ${
                        theme === "dark" ? "text-white hover:bg-gray-700" : ""
                      }`}
                    >
                      Profile
                    </Link>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <Link
                      to="/login"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-4 py-2 text-sm ${
                        theme === "dark" ? "text-white hover:bg-gray-700" : ""
                      }`}
                    >
                      Log in
                    </Link>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <Link
                      to="/signup"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-4 py-2 text-sm ${
                        theme === "dark" ? "text-white hover:bg-gray-700" : ""
                      }`}
                    >
                      Sign up
                    </Link>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <Link
                      to="/login"
                      onClick={() => {
                        localStorage.setItem("token", "");
                      }}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-4 py-2 text-sm ${
                        theme === "dark" ? "text-white hover:bg-gray-700" : ""
                      }`}
                    >
                      Log out
                    </Link>
                  )}
                </HeadlessMenu.Item>
              </HeadlessMenu.Items>
            </HeadlessMenu>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 max-w-xs w-full shadow-xl p-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-5 right-5"
          >
            <X className="h-6 w-6" />
          </button>
          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className={`block ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`block ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`block ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={`block ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <footer
        className={`mt-auto ${
          theme === "dark" ? "bg-zinc-900 " : "bg-gray-100 "
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                EcoShop is your one-stop destination for eco-friendly products.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className={`${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Shipping
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                Email: support@ecoshop.com
              </p>
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                Phone: (+91) XXX-9653
              </p>
            </div>
          </div>
          <div
            className={`mt-8 pt-8 border-t ${
              theme === "dark"
                ? "border-gray-700 text-gray-400"
                : "border-gray-200 text-gray-600"
            } text-center`}
          >
            © 2024 EcoShop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
