import React from 'react';
import Map from './Map';
import NavBar from './NavBar';

function Outbreaknearme() {
  return (
  <>
 
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Outbreak Near Me</h1>

        {/* Map Section */}
        <div className="w-full ">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Map</h2>
            <div className="h-max">
              <Map />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        
      </div>
    </div>
  </>
  );
}

export default Outbreaknearme;
