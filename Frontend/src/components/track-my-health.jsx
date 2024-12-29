import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

const TrackMyHealth = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [fatPercentage, setFatPercentage] = useState('');
  const [bmi, setBmi] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Commenting out data fetching for now (uncomment if needed)
    // Fetch data from MongoDB and update state variables
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/healthData'); // Replace with your API endpoint
        const { age, weight, height, fatPercentage } = response.data;

        setAge(age);
        setWeight(weight);
        setHeight(height);
        setFatPercentage(fatPercentage);

        // Calculate BMI
        const bmi = calculateBMI(weight, height);
        setBmi(bmi);
      } catch (error) {
        console.error('Error fetching health data:', error);
        setError('Error fetching health data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Temporary data
    setAge('30');
    setWeight('75');
    setHeight('180');
    setFatPercentage('20');

    // Calculate BMI for temporary data
    const bmi = calculateBMI('75', '180');
    setBmi(bmi);

    // Set loading to false
    setLoading(false);
  }, []);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <><div className="h-screen flex justify-center items-center" style={{ backgroundImage: 'linear-(to right top, #65dfc9, #6cdbeb, #8b9ee5, #a53dad, #7a2e80)' }}>
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Track My Health</h2>
        <table className="table-auto mx-auto rounded-lg shadow-md">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-4 flex items-center text-center">
                <p className="font-semibold mr-2">Age:</p> ⏳: {age}
              </td>
              <td className="p-4 text-right">{age}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 flex items-center text-center">
                <p className="font-semibold mr-2">Weight (kg):</p> ⚖️: {weight}
              </td>
              <td className="p-4 text-right">{weight}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 flex items-center text-center">
                <p className="font-semibold mr-2">Height (cm):</p> ↕️: {height}
              </td>
              <td className="p-4 text-right">{height}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 flex items-center text-center">
                <p className="font-semibold mr-2">Fat Percentage:</p> {fatPercentage}%
              </td>
              <td className="p-4 text-right">{fatPercentage}%</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 flex items-center text-center">
                {/* This cell is intentionally left blank */}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Your Health Summary</h3>
          <p className="text-gray-700">
            Here's a summary of your health based on the data you provided:
          </p>
          <ul className="mt-2">
            <li className="mb-1">
              <span className="font-semibold">BMI:</span> Your Body Mass Index is <strong>{bmi}</strong>, which indicates your body weight status.
            </li>
            <li className="mb-1">
              <span className="font-semibold">Fat Percentage:</span> Your body fat percentage is <strong>{fatPercentage}%</strong>, which reflects your body composition.
            </li>
          </ul>
        </div>
      </div>
    </div></>
  );
};

export default TrackMyHealth;
