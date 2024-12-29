import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
function AddHospitals() {
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch("http://localhost:2024/api/auth/states");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStates(data.districts || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    // console.log(username,password);
    try {
      const response = await fetch(
        "http://localhost:2024/api/auth/addHospital",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hospitalName: hospitalName,
            location: location,
            specialty: specialty,
            district: selectedState,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.token);
        if (data.dataCode == 2) {
          Swal.fire({
            title: "Success",
            text: "Hospital Added Successfully",
            icon: "success",
            showConfirmButton: true,
          }).then(() => {
            window.location.href = "/";
          });
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Hospital</h2>
        <div className="mb-4">
          <label
            htmlFor="hospitalName"
            className="block text-gray-700 font-medium mb-2"
          >
            Hospital Name
          </label>
          <input
            type="text"
            id="hospitalName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-2"
          >
            Location (Address)
          </label>
          <input
            type="text"
            id="location"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="specialty"
            className="block text-gray-700 font-medium mb-2"
          >
            Specialty
          </label>
          <input
            type="text"
            id="specialty"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-gray-700 font-medium mb-2"
          >
            State
          </label>
          <select
            id="state"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="" disabled hidden>
              Select a State
            </option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Hospital
        </button>
      </form>
    </div>
  );
}

export default AddHospitals;
