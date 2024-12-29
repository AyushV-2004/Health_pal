import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const VerificationPage = () => {
  const location = useLocation();
  const id = location.search.substring(1); // Remove the "?" from the search string

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("http://localhost:2024/api/auth/verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }), // Convert to JSON string
        });

        if (response.ok) {
            Swal.fire({
                title: "Success",
                text: "User verified successfully",
                icon: "success",
                showConfirmButton: true,
              }).then(() => {
                // Display a loading spinner or message here if needed
                setTimeout(() => {
                  window.location.href = "http://localhost:5173/login";
                }, 2000); // Delay of 2 seconds (2000 milliseconds)
              });
        } else {
          Swal.fire({
            title: "Error",
            text: "User verification failed",
            icon: "error",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      }
    };

    verifyUser();
  }, [id]); // Add id as a dependency to useEffect

  return <></>; // You can render a loading spinner or message here while waiting for the verification
};

export default VerificationPage;
