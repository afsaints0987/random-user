import React, { useState, useEffect, useCallback } from "react";
import { User } from "../types/User";
import http from "../api/http";

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch the User from the API and store the data to local storage
  const fetchUser = async () => {
    try {
      const response = await http.get("/");
      const userData = await response.data.results[0];
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.log("Error fetching the user", err);
    }
  };
  // Display the User Info from the local storage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userInfo = JSON.parse(savedUser);
      console.log(userInfo);
      setUser(userInfo);
    } else {
      fetchUser();
    }
  }, []);

  // Refresh the Component and Change the User Display
  const handleRefresh = useCallback(() => {
    fetchUser();
  }, []);


  // Destructuring the object to assign a new variable
  let fullName, email, image;
  if(user){
    const {name: {first, last}, email: userEmail, picture: {medium}} = user
    fullName = `${first} ${last}`
    image = medium
    email = userEmail
  }

  return (
    <div className="d-flex justify-content-center flex-column align-items-center mx-auto vh-100 text-center">
      <h1>Random.User</h1>
      {user && (
        <div>
          <img
            src={image}
            alt={fullName}
            className="rounded-circle thumbnail my-2"
          />
          <h3>
            {fullName}
          </h3>
          <p>{email}</p>
        </div>
      )}
      <button className="btn btn-outline-primary" onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );
};

export default UserInfo;
