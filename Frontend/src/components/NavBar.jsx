import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo";
import { useAuth } from "./Auth";

const NavBar = () => {
  const navigate = useNavigate();
  const {isLoggedIn,user} = useAuth();
  const login = () => {
    navigate("/login");
  };
  const logout = () => {
    navigate("/logout");
  };

  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="md:order-1 w-24 h-24 my-auto">
          <Logo />
        </div>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            <NavLink
              exact="true"
              to="/"
              className="md:px-4 md:py-2 transition-all text-black font-bold font-sans hover:text-xl"
            >
              <li>Dashboard</li>
            </NavLink>

            <NavLink
              to="/about"
              className="md:px-4 md:py-2 transition-all text-black font-bold font-sans hover:text-xl"
            >
              <li>About</li>
            </NavLink>

            <NavLink
              to="/contact"
              className="md:px-4 md:py-2 transition-all text-black font-bold font-sans hover:text-xl"
            >
              <li>Contact</li>
            </NavLink>

            {
              isLoggedIn?<>
              
            <NavLink
              to="/profile"
              className="md:px-4 md:py-2 transition-all text-black font-bold font-sans hover:text-xl"
            >
              <li>Profile</li>
            </NavLink>
              </>:<></>
            }
            {
              user.isAdmin?<>
              <NavLink
              to="/add_hospital"
              className="md:px-4 md:py-2 transition-all text-black font-bold font-sans hover:text-xl"
            >
              <li>Add Hospital</li>
            </NavLink>
              </>:<></>
            }
          </ul>
        </div>
       {
       isLoggedIn?<>
        <div className="order-2 md:order-3">
          <button
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
       </>:
        <div className="order-2 md:order-3">
        <button
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
          onClick={login}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Login/register</span>
        </button>
      </div>
       }
      </div>
    </nav>
  );
};

export default NavBar;
