import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import gujaratGeoJSON from "./gujarat.json"; // Import the GeoJSON data for Gujarat

const Map = () => {
  const defaultStyle = {
    fillColor: "rgba(255, 165, 0, 0.1)",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.4,
  };

  const highlightStyle = {
    fillColor: "rgba(255, 165, 0, 0.6)", // Highlight color
    color: "black",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
  };

  const geoJsonLayerRef = useRef(null); // Ref for the GeoJSON layer

  const onEachFeature = async (feature, layer) => {
    let tooltipContent = `<strong>District:</strong> ${feature.properties.district}</br>`;

    const response = await fetch("http://localhost:2024/api/auth/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ district: feature.properties.district }),
    });

    if (response.ok) {
      const data = await response.json();

      // Update tooltip content with COVID-19 data
      tooltipContent += `
        <strong>Active Cases:</strong> ${data.activeCases}</br>
        <strong>Total Cases:</strong> ${data.totalCases}</br>
        <strong>Recovered Cases:</strong> ${data.recoveredCases}</br>
        <strong>Deceased Cases:</strong> ${data.deceasedCases}</br>
      `;

      // Update style based on active cases
      let fillColor = "rgba(255, 165, 0, 0.1)"; // Default color
      if (data.activeCases > 500) {
        fillColor = "rgba(255, 0, 0, 0.4)"; // Red zone for active cases > 500
      } else if (data.activeCases > 250) {
        fillColor = "rgba(0, 255, 0, 0.4)"; // Green zone for active cases > 250
      }

      layer.setStyle({
        fillColor,
        color: "black",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.6,
      });
    } else {
      tooltipContent += `<strong>Data not available</strong>`;
    }

    layer.bindTooltip(tooltipContent);

    layer.on({
      // mouseover: () => {
      //   layer.setStyle(highlightStyle); // Set highlight style on mouseover
      // },
      // // mouseout: () => {
      // //   layer.setStyle(defaultStyle); // Set default style on mouseout
      // // },
    });
  };

  return (
    <>
      <MapContainer
        center={[22.2587, 71.1924]} // Centered coordinates for Gujarat
        zoom={8}
        style={{ height: "540px", width: "100%" }}
        maxBounds={[
          // Bounds covering Gujarat
          [20.1221, 68.1626], // Southwest coordinates
          [24.3963, 74.6162], // Northeast coordinates
        ]}
      >
        {/* Main map layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* GeoJSON layer for Gujarat */}
        <GeoJSON
          ref={geoJsonLayerRef}
          data={gujaratGeoJSON}
          style={defaultStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </>
  );
};

export default Map;
