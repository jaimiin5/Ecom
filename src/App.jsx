import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PrivateRoute from "./route/PrivateRoute";
import ProductList from "./components/products/ProductList";
import Profile from "./components/profile/Profile";
import AboutUs from "./components/about/AboutUs";
import SignUp from "./components/register/SignUp";
import Layout from "./components/Layout";
import Login from "./components/register/Login";
import Cart from "./components/cart/Cart";
import Favorites from "./components/fav/Favorite";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const addToCart = (product) => {
    toast.success(`${product.title} added to cart!`);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((item) => item.id === product.id);
      if (isFavorite) {
        return prevFavorites.filter((item) => item.id !== product.id);
      }
      return [...prevFavorites, product];
    });
  };

  return (
    <Router>
      <div>
        <Layout
          cartItemsCount={cartItems.length}
          favoritesCount={favorites.length}
          onCartClick={() => setShowCart(true)}
          onFavoritesClick={() => setShowFavorites(true)}
          onSearch={setSearchTerm}
        >
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ProductList
                    searchTerm={searchTerm}
                    addToCart={addToCart}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                </PrivateRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          {showCart && (
            <Cart
              items={cartItems}
              onClose={() => setShowCart(false)}
              removeFromCart={removeFromCart}
            />
          )}
          {showFavorites && (
            <Favorites
              items={favorites}
              onClose={() => setShowFavorites(false)}
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Layout>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;
