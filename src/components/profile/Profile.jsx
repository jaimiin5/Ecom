import { useEffect, useState } from "react";
import { useTheme } from "../../context/themeContext";

export default function Profile() {
  const { theme } = useTheme();
  const [user, setUser] = useState();
  const getUserData = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await res.json();
    setUser(data);
    return data;
  };

  useEffect(() => {
    getUserData();
  }, []);

  const formateDate = (value) => {
    const date = new Date(value);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div
        className={`${
          theme === "dark" ? "bg-zinc-900" : "bg-white"
        } shadow rounded-lg p-6`}
      >
        <div className="flex items-center space-x-6 mb-4">
          <img
            className="h-24 w-24 rounded-full"
            src="https://picsum.photos/seed/user/200"
            alt="User avatar"
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.name || "user"}</h2>
            <p className="text-gray-600">{user?.email || "user@gmail.com"}</p>
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">Account Details</h3>
          <p>
            <strong>Member since:</strong> {formateDate(user?.date)}
          </p>
          <p>
            <strong>Last login:</strong> Today at 12:34 PM
          </p>
        </div>
        <div className="border-t pt-4 mt-4">
          <h3 className="text-xl font-semibold mb-2">Order History</h3>
          <p>You have not placed any orders yet.</p>
        </div>
      </div>
    </div>
  );
}
