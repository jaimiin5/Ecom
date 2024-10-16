/* eslint-disable react/prop-types */
import { X, ShoppingCart } from "lucide-react";
import { useTheme } from "../../context/themeContext";

export default function Favorites({
  items,
  onClose,
  addToCart,
  toggleFavorite,
}) {
  const { theme } = useTheme();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div
        className={`${
          theme === "dark" ? "bg-zinc-800" : "bg-white"
        } w-full max-w-md h-full overflow-y-auto p-6`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Favorites</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {items.length === 0 ? (
          <p>You haven&apos;t added any favorites yet.</p>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    }`}
                  >
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
