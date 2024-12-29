import React, { useEffect, useState } from "react";
  import { useAuth } from "./Auth";

  function Profile() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const[bmi,setBmi] = useState("");

    const calculateBMI = (height,weight) => {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
     return bmi.toFixed(2)
    
    };
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:2024/api/auth/getHealthData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        if (response.ok) {
          const responseData = await response.json();

         
          setData(responseData.data); // Extracting the 'data' object from the response
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <>
        <div className="p-16">
          <div className="p-8 bg-white shadow mt-24">
            {data ? (
              <>
                  <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                      <div>
                          <p className="font-bold text-gray-700 text-xl">{user.age}</p>
                          <p className="text-gray-400">Age</p>
                      </div>
                      <div>
                          <p className="font-bold text-gray-700 text-xl">{data.height}</p>
                          <p className="text-gray-400">Height</p>
                      </div>
                      <div>
                          <p className="font-bold text-gray-700 text-xl">{data.weight}</p>
                          <p className="text-gray-400">Weight</p>
                      </div>
                      </div>
                      <div className="relative">
                      <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-24 w-24"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          >
                          <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                          />
                          </svg>
                      </div>
                      </div>
                      <div className="text-center bg-white rounded-lg shadow-md">
       

        <div >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Your Health Summary</h3>
          <p className="text-gray-700">
            Here's a summary of your health based on the data you provided:
          </p>
          <ul className="mt-2">
            <li className="mb-1">
              <span className="font-semibold">BMI:</span> Your Body Mass Index is <strong>{ calculateBMI(data.height,data.weight)}</strong>, which indicates your body weight status.
            </li>
          </ul>
        </div>
      </div>
                  </div>
                  <div className="mt-20 text-center border-b pb-12">
                      <h1 className="text-4xl font-medium text-gray-700">{user.userName}</h1>
                      <p className="mt-2 text-gray-500">{user.email}</p>
                  </div>
                  
                {/*  */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Data</h2>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Field
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Email
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Age
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.age}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Weight
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.weight}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Height
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.height}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Hereditary Disease
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.hereditaryDisease}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Ongoing Disease
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.ongoingDisease}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Allergy
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.allergy}
                        </td>
                      </tr>
                    </tbody>
                  </table>    
  {/*  */}

              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </>
    );
  }

  export default Profile;