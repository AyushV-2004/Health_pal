import React, { useState, useEffect } from "react";

const MedicalCenters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicalCenters, setFilteredMedicalCenters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [centersPerPage] = useState(7);
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  // Function to filter medical centers based on search term
  const filterMedicalCenters = (searchTerm) => {
    const filteredCenters = medicalCenters.filter(
      (center) =>
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicalCenters(filteredCenters);
  };

  // Pagination logic
  const indexOfLastCenter = currentPage * centersPerPage;
  const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
  const currentCenters = filteredMedicalCenters.slice(
    indexOfFirstCenter,
    indexOfLastCenter
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      if (data.districts.length > 0) {
        setDistricts(data.districts);
      }
    } catch (error) {
      console.error("Fetch states error:", error);
    }
  };

  useEffect(() => {
    if (selectedState) {
      fetchMedicalCentersByState(selectedState);
    }
  }, [selectedState]);

  const fetchMedicalCentersByState = async (state) => {
    try {
      const response = await fetch(
        `http://localhost:2024/api/auth/medicalsNearme?state=${state}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (response.ok) {
        setMedicalCenters(
          data.map((center) => ({
            name: center.hospitalName,
            location: center.location,
            specialty: center.specialty,
          }))
        );
        setLoading(false); // Data fetching completed
      }
    } catch (error) {
      console.error("Fetch medical centers by state error:", error);
      setLoading(false); // Handle error by setting loading to false
    }
  };

  // Update filtered centers when search term or medical centers change
  useEffect(() => {
    filterMedicalCenters(searchTerm);
  }, [searchTerm, medicalCenters]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 py-6">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name, location, or specialty"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Dropdown for States */}
          <div className="mb-4">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled hidden>
                Select a State
              </option>
              {districts.map((districtOption, index) => (
                <option key={index} value={districtOption}>
                  {districtOption}
                </option>
              ))}
            </select>
          </div>
          {/* Table */}
          {loading ? (
            <p>Loading...</p>
          ) : medicalCenters.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Specialty
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentCenters.map(
                    ({ name, location, specialty }, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{specialty}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No medical centers found.</p>
          )}
          {/* Pagination */}
          {filteredMedicalCenters.length > centersPerPage && (
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md bg-blue-500 text-white ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <nav className="flex space-x-2">
                {[...Array(Math.ceil(filteredMedicalCenters.length / centersPerPage))].map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500 hover:bg-gray-200 hover:text-blue-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </nav>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredMedicalCenters.length / centersPerPage)
                }
                className={`px-4 py-2 rounded-md bg-blue-500 text-white ${
                  currentPage ===
                  Math.ceil(filteredMedicalCenters.length / centersPerPage)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MedicalCenters;
