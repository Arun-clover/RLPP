import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { jwtDecode } from "jwt-decode";
import "./styles/page2.css";

export default function Page2() {
  const navigate = useNavigate();
  const [hasnewtoken, setHasNewToken] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const getNewToken = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/Login");
        return;
      }
      const decode = jwtDecode(token);
      const userId = decode.id;
      const response = await axios.post(`${API_URL}/newtoken`, { userId });

      if (response.data.success) {
        localStorage.setItem("newtoken", response.data.token);
        setHasNewToken(true);
        alert("New token generated successfully");
      }
    } catch (error) {
      console.error("Error generating token:", error);
      alert("Failed to generate new token");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    alert("You have logged out successfully!");
    navigate("/Login");
  };
  const removeToken = () => {
    localStorage.removeItem("newtoken");
    alert("Token removed successfully!");
    setHasNewToken(false);
  };

  useEffect(() => {
    const newtoken = localStorage.getItem("newtoken");
    if (newtoken) {
      setHasNewToken(true);
    }
  }, []);

  return (
    <div>
      <h1 className="page-title">Welcome to Page2</h1>
      <div className="profile">
        <img className="img" src={require("../images/arun3.jpg")} alt="Arun" />
        <br />
        <h3>Hi! You have logged in successfully!</h3>
        <div>
          <button
            onClick={getNewToken}
            disabled={isloading}
            style={{ marginRight: "10px" }}
          >
            {isloading ? "Generating..." : "Get New Token"}
          </button>
          <button onClick={logout}>Log out</button>
          <button onClick={removeToken}>remove token</button>
        </div>
      </div>

      {/* Protected content */}
      {hasnewtoken ? (
        <div className="protected-profile">
          <h2>Protected Content</h2>
          <img
            className="img"
            src={require("../images/arun2.jpg")}
            alt="Protected Content"
          />
          <p>This content is only visible with a valid token</p>
        </div>
      ) : (
        <div className="protected-profile-placeholder">
          <p>Generate a new token to view protected content</p>
        </div>
      )}
    </div>
  );
}
