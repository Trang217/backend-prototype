import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

export default function AccountDetail() {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/users/profile");

      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {user != null ? (
        <>
          <h1>{user._id}</h1>
          <h1>{user.firstName}</h1>
          <h3>{user.username}</h3>
          <h4>{user.email}</h4>
        </>
      ) : (
        <p>No user found</p>
      )}
    </>
  );
}
