/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useTheme } from "../../context/themeContext";
import toast from "react-hot-toast";

export default function Cart({ items, onClose, removeFromCart }) {
  const { theme } = useTheme();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end`}
    >
      <div
        className={` ${
          theme === "dark" ? "bg-zinc-800" : "bg-white"
        } w-full max-w-md h-full overflow-y-auto p-6`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
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
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <button
                onClick={() =>
                  toast("website in progress!", {
                    icon: "⚙️",
                  })
                }
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
