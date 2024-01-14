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
import CommunityActivity from "./components/CommunityActivity.jsx";
import CommunityActivityForm from "./components/CommunityActivityForm.jsx";
import VerifyUser from "./components/VerifyUser.jsx";
import VerifyActivity from "./components/VerifyActivity.jsx";
import GiveFeedback from "./components/GiveFeedback.jsx";

function App() {
  const [userData, setUserData] = useState({});
  const handleCreateActivity = (activityData) => {
    console.log('Form Submitted', activityData);
  };

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
          <Route
            path="/community-activities/:username"
            element={<CommunityActivity userData={userData} setUserData={setUserData}/>}
          />
          <Route
              path="/community-activities/create/:username"
              element={<CommunityActivityForm onSubmit={handleCreateActivity} userData={userData} setUserData={setUserData}/>}
          />
          <Route
            path="/verify-user"
            element={<VerifyUser/>}
            />
          <Route
            path="/verify-activity"
            element={<VerifyActivity/>}
            />
          <Route
            path="/give-feedback"
            element={<GiveFeedback/>}
            />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
