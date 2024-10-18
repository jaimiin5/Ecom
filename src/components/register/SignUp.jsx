import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import API_BASE_URL from "../../../config";

export default function SignUp() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saveUser = async () => {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save user");
      }
      const data = await res.json();
      return data;
    };
    toast
      .promise(saveUser(), {
        loading: "Saving...",
        success: <b>User registered successfully</b>,
        error: <b>User already exists!!</b>,
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className={` ${
          theme === "dark" ? "bg-zinc-900" : "bg-white"
        } shadow-md rounded px-8 pt-6 pb-8 mb-4`}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="ex@email.com"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
