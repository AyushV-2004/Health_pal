// App.js
import React, { useState } from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import MedicalCenters from "./components/medication-near-me";
import TrackMyHealth from "./components/track-my-health";
import ContactPage from "./components/ContactPage";
import AboutUsPage from "./components/AboutPage";
import HealthDataForm from "./components/HealthDataForm";
import Outbreaknearme from "./components/Outbreaknearme";
import NotFound from "./components/NotFound";
import "./App.css";
import Verification from "./components/Verification";
import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import { useAuth } from "./components/Auth";
import AddHospitals from "./components/AddHospitals";

const App = () => {
  const [healthData, setHealthData] = useState(null);

  const handleHealthDataSubmit = (data) => {
    setHealthData(data);
  };

  const { isLoggedIn,user } = useAuth();
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/medication-near-me" element={<MedicalCenters />} />
          {isLoggedIn ? (
            <>
              <Route
                path="/track-my-health"
                element={
                  healthData ? (
                    <TrackMyHealth healthData={healthData} />
                  ) : (
                    <HealthDataForm onSubmit={handleHealthDataSubmit} />
                  )
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/outbreak-near-me"
                element={<Outbreaknearme />}
              />
            </>
          ) : (
            <></>
          )}
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/logout" element={<Logout />} />
{
  user.isAdmin?<>
  <Route path="/add_hospital" element={<AddHospitals />} />
  </>:<></>
}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
