import Register from "./components/Register";
import Login from "./components/Login";
import Children from "./components/Children";
import ChildPhoto from "./components/ChildPhoto";
import UserPhoto from "./components/UserPhoto";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import Child from "./components/Child";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState({});
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route
            path="/register"
            element={<Register userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/login"
            element={<Login userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/children"
            element={<Children userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/children/:name"
            element={<Child userData={userData} setUserData={setUserData} />}
          />
          <Route path="/users/:name" element={<UserPhoto />} />
          <Route
            path="/profile/:username"
            element={<Profile userData={userData} setUserData={setUserData} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
