/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "../../context/themeContext";
import { ClipLoader } from "react-spinners";

export default function ProductList({
  searchTerm,
  addToCart,
  toggleFavorite,
  favorites,
}) {
  const { theme } = useTheme();
  const [productData, setProductData] = useState();

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Data");
    }
    const data = await res.json();
    setProductData(data.products);
    return data;
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = productData?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleToggleFavorite = (product) => {
    toggleFavorite(product);
    const isFavorite = favorites.find((fav) => fav.id === product.id);
    if (isFavorite) {
      toast.success(`${product.title} removed from favorites!`);
    } else {
      toast.success(`${product.title} added to favorites!`);
    }
  };

  return (
    <div>
      {!productData ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color={"#1875f5"} loading={true} size={60} />{" "}
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className={`${
                  theme === "dark" ? "bg-zinc-900" : "bg-white"
                } rounded-lg shadow-md overflow-hidden`}
              >
                <img
                  src={`https://picsum.photos/seed/${product.id}/300/200`}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleFavorite(product)}
                        className={`p-2 rounded-full ${
                          favorites.find((fav) => fav.id === product.id)
                            ? "bg-red-500 text-white"
                            : `${
                                theme === "dark"
                                  ? "bg-zinc-800"
                                  : "bg-gray-200 text-gray-600"
                              }`
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-500 text-white px-2.5 py-1.5 rounded hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
