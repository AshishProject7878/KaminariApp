import { useEffect, useState } from "react";
import API from "../API/axios.js";

const Profile = () => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/users/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Profile</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}

export default Profile