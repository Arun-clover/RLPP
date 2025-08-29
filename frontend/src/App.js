import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./Page/page";
import Login from "./component/login/Login";
import Registration from "./component/registration/Registration";
import Page2 from "./Page/page2";
import ProtectedRoute from "./component/protected/protected";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/page" element={<Page />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* protected route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/page2" element={<Page2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
