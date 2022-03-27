import React, { Fragment } from "react";
import { FcCheckmark } from "react-icons/fc";
import {SiMicrosoftoutlook} from 'react-icons/si'
import {SiMicrosoftoffice} from 'react-icons/si'
import {BsMicrosoft} from 'react-icons/bs'
import {FaGoogle} from 'react-icons/fa'
import {IoCheckmarkCircleSharp} from 'react-icons/io'
import {useRouter} from 'next/router'
function Success() {
    const router = useRouter()
    const {username} = router.query
    const {name} = router.query
    const {email} = router.query
    const {date} = router.query
    const {length} = router.query
    const formatDate = new Date(date);
    const { description } = router.query
    console.log(date)
  return (
    <Fragment>
      <div className="w-screen h-screen flex justify-center items-center">
        <div style={{ width: "40rem" }} className="h-96 border-2 rounded-md">
          <div className="flex flex-col justify-center items-center px-12">
            <FcCheckmark className="text-4xl rounded-md py-10 px-10 bg-black  " />
            <h2 className="font-sans font-semibold text-2xl py-1">
              This meeting is scheduled
            </h2>
            <p className="font-sans text-md pb-4 text-gray-400">
              We emailed you and the other attendees a calendar invitation with
              all the details
            </p>
          </div>

          <div
            style={{ justifyContent: "space-evenly" }}
            className="flex justify items-center py-2"
          >
            <p className="font-sans text-lg text-gray-500 font-bold">What</p>
            <p className="font-sans text-md text-gray-500 ">
              {description} between {username} and {name}
            </p>
          </div>

          <div
            style={{ justifyContent: "space-around" }}
            className="flex justify-around items-center py-2"
          >
            <p className="font-sans text-lg text-gray-500 font-bold">When</p>
            <p className="font-sans text-md text-gray-500 ">
              {formatDate.toDateString()} <br />
              {formatDate.toLocaleTimeString()} - {length} mins(Africa/Lagos)
            </p>
          </div>

          <div
            className="flex justify-around items-center py-3"
            style={{ justifyContent: "space-around" }}
          >
            <p className="font-sans font-bold text-lg text-gray-500 ">
              Add to Calendar
            </p>
            <div
              style={{ gap: "1.5rem", justifyContent: "space-around" }}
              className="flex gap-4 items-center"
            >
              <FaGoogle className="hover:cursor-pointer" />
              <SiMicrosoftoutlook className="hover:cursor-pointer" />
              <SiMicrosoftoffice className="hover:cursor-pointer" />
              <BsMicrosoft className="hover:cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center my-5">
            <p className="font-sans text-sm text-gray-400">
              Create your own booking link with Cal.com
            </p>
            <div>
              <input
                type="email"
                value={email}
                className=" px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button className="px-4 py-2 border bg-black text-white rounded-md">
                Try it for free
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Success;
