import { useState } from "react";
import API from "../API/axios.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
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

    try {
      const res = await API.post("/users/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error appropriately, e.g., show a message to the user
      if (error.response) {
        alert(error.response.data.message || "Registration failed");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
