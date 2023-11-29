import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 py-2">
      <nav className="flex items-center justify-center">
        <Link
          to="/"
          className="text-white font-semibold px-4 py-1 rounded-md hover:bg-gray-700"
        >
          Home
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
