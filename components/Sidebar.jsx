import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { BsFolderSymlinkFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { getSession, useSession, signOut } from "next-auth/client";

const Sidebar = ({setState}) => {
  
  return (
    <div className="sidebar basis-1/5 bg-white border min-h-screen">
      <h2 className="font-sans text-xl font-bold py-4 px-3">Cal.com</h2>
      <button
        onClick={() => setState("event")}
        className="flex items-center w-full text-dark-200 hover:bg-gray-200 py-3  "
      >
        <BsLink45Deg className="text-xl " />
        Event Types
      </button>

      <button
        onClick={() => setState("booking")}
        className="flex items-center w-full mt-2 text-dark-200 hover:bg-gray-200 py-3  "
      >
        <BsFolderSymlinkFill className="text-xl " />
        Booking
      </button>
      <button
        onClick={() => signOut()}
        className="bg-gray-300 text-white mt-5 border py-3 px-3 rounded-md mb-1"
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
