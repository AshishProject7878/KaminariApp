import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API/axios.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      // Handle error appropriately, e.g., show a message to the user
      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
