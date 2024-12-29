import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import Swal from 'sweetalert2';

const HealthDataForm = ({ onSubmit }) => {
  
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [hereditaryDisease, setHereditaryDisease] = useState('');
  const [ongoingDisease, setOngoingDisease] = useState('');
  const [allergy, setAllergy] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (weight && height && hereditaryDisease && ongoingDisease && allergy) {
      try {
        const response = await fetch('http://localhost:2024/api/auth/healthData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            height: height,
            weight: weight,
            hereditaryDisease: hereditaryDisease,
            ongoingDisease: ongoingDisease,
            allergy:allergy,
            age: user.age,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.dataCode === 2) {
            Swal.fire({
              title: 'Good job!',
              text: data.message,
              icon: 'success',
            }).then(() => {
              navigate('/track-my-health');
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Server error',
              icon: 'error',
            });
          }
        } else {
          console.error('HTTP error:', response.status);
          Swal.fire({
            title: 'Error',
            text: 'Server error',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Fetch error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Fetch error',
          icon: 'error',
        });
      }
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="shadow-xl ring-4 ring-gray-900/5 mx-auto w-[80%] grid grid-cols-2 gap-4 bg-slate-100 p-8 rounded-lg ">
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Health Data</h2>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-semibold mb-1">Age: {user.age}</label> 
            
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="block text-gray-700 font-semibold mb-1">Weight (kg):</label>
            <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="height" className="block text-gray-700 font-semibold mb-1">Height (cm):</label>
            <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-4">
            <label htmlFor="hereditaryDisease" className="block text-gray-700 font-semibold mb-1">Hereditary Disease:</label>
            <input type="text" id="hereditaryDisease" value={hereditaryDisease} onChange={(e) => setHereditaryDisease(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="ongoingDisease" className="block text-gray-700 font-semibold mb-1">Ongoing Disease:</label>
            <input type="text" id="ongoingDisease" value={ongoingDisease} onChange={(e) => setOngoingDisease(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="allergy" className="block text-gray-700 font-semibold mb-1">Allergy:</label>
            <input type="text" id="allergy" value={allergy} onChange={(e) => setAllergy(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
        
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default HealthDataForm;
