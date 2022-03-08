import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";

export const HomePageTopSection = () => {
  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="https://cdn.pixabay.com/photo/2019/05/17/19/46/notepad-4210517__340.jpg"
        className="absolute h-full w-full object-cover"
        alt="background "
      />
      <div className="inset-0 bg-black opacity-25 absolute"></div>
      <NavBar />
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
          <span className="font-bold uppercase text-yellow">Himalaya</span>
          <h1 className="font-bold text-6xl sm:text-7xl text-whiteColor leading-tight mt-4">
            Let yourself be carried
            <br />
            by nature
          </h1>
          <Link
            to="/posts"
            className="block bg-whiteColor hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10"
          >
            Discover
          </Link>
        </div>
      </div>
    </div>
  );
};
