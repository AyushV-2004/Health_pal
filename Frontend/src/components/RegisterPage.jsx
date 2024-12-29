// Import React, useState, useEffect, and Link
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Illustration from "../assets/Illustration";
import Swal from "sweetalert2";
import { DNA } from "react-loader-spinner";

// Define RegisterPage component
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  // Define state variables using useState
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const navigate = useNavigate();
  // useEffect hook to fetch state data from the server
  useEffect(() => {
    fetch("http://localhost:2024/api/auth/states", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStateOptions(data.districts); // Assuming data.districts contains the district names
      })
      .catch((error) => {
        console.error("Error fetching state options:", error);
      });
  }, []);

  // Event handler functions for form inputs
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleMobileNumberChange = (e) => setMobileNumber(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // Function to send the form using EmailJS
  const sendEmail = (email, password, username, id) => {
    var data = {
      service_id: "service_335vjki",
      template_id: "template_7rjrrgt",
      user_id: "B5VDWvNsCNImwE-nA",
      template_params: {
        username: username,
        password: password,
        id: id,
        email: email,
      },
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setLoading(false);
          Swal.fire({
            title: "Success",
            text: "User Registration Successful, please check your email for verification",
            icon: "success",
          }).then(() => {
            navigate("/login")
          });
        } else {
          throw new Error("Failed to send email.");
        }
      })
      .catch((error) => {
        alert("Oops... " + error.message);
      });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = {
      userName: name,
      email,
      password,
      phone: mobileNumber,
      district: state, // Assuming state represents the district
      country,
      age,
      isAdmin: false, // Set isAdmin to 0
    };
    // console.log(formData);
    fetch("http://localhost:2024/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.dataCode == 2) {
          sendEmail(data.email, data.password, data.username, data.userId);
        } else {
          Swal.fire({
            title: "error",
            text: "User Already Exists or data is inValid",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "error",
          text: "User Already Exists or data is inValid",
          icon: "error",
        });
      });
  };

  return (
    <>
     
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm">
          <DNA
            visible={true}
            height={80}
            width={80}
            color="#00BFFF"
            ariaLabel="dna-loading"
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      <div className="container mx-auto mt-8 flex flex-col md:flex-row justify-center items-center max-w-[80%] h-5/6">
        <div className="w-full md:w-1/2 mr-0 md:mr-8 mb-8 md:mb-0">
          <Illustration />
        </div>
        <div className="w-full md:w-1/2 border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="col-span-1 md:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-1"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>

            <div className="col-span-1 md:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmail}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="age" className="block text-sm font-semibold mb-1">
                Age:
              </label>
              <input
                type="number"
                id="age"
                value={age}
                max={100}
                min={0}
                onChange={handleAgeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="state"
                className="block text-sm font-semibold mb-1"
              >
                State:
              </label>
              <select
                id="state"
                value={state}
                onChange={handleStateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              >
                <option value="">Select state</option>
                {stateOptions.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="country"
                className="block text-sm font-semibold mb-1"
              >
                Country:
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={handleCountryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-semibold mb-1"
              >
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>

            <div className="col-span-1 md:col-span-3">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

// Export the RegisterPage component
export default RegisterPage;
