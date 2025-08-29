
import "./styles/page.css";
import { useNavigate } from "react-router-dom";
export default function Page() {
  const navigate = useNavigate();
  return (
    <div className="navbtn" >
      <h1>Navigation to next page</h1> 
     <button  onClick={() => navigate("/Login")}>login page</button>
      
    </div>
  );
}
