import React, { useState } from "react";
import {useRouter} from "next/router";
import urlSlug from "url-slug";


function Neweventform({ setShowModal, authUser }) {
  const host = window.location.host;
  const { email, username, id } = authUser;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState("");
  const slug = urlSlug(title)
  const saveHost = `${host}/${username}/${slug}`;
  const router = useRouter()


  async function createNewEvent(
    title,
    url,
    description,
    length,
    userId,
    email,
    username
  ) {
    const response = await fetch("/api/event/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        url,
        description,
        length,
        userId,
        email,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      router.push("/events/allevent");
      setShowModal(false)
    }
    return data;
  }
  
  
  async function handleSubmitEvent(e) {
    e.preventDefault();

    try {
      const result = await createNewEvent(title, saveHost, description, length, id, email, username);
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-gray-600 opacity-80 fixed inset-0 z-50 ">
      <div className="flex h-screen justify-center items-center  ">
        <div className="flex-col  bg-white py-5 px-5 border-4  rounded-xl ">
          <h3 className="font-sans text-lg font-bold">Add a new event type</h3>
          <p>Create a new event type for people to book times with.</p>
          <form action="">
            <label htmlFor="title" className="mt-4 text-lg">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <label htmlFor="title" className="mt-4 text-lg">
              URL
            </label>
            <div>
              <span>{saveHost}</span>
              <input
                type="text"
                name="url"
                id="url"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <label htmlFor="description" className="block">
              Description
            </label>
            <textarea
              name=""
              id=""
              cols="5"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="A quick video meeting"
            ></textarea>
            <label htmlFor="description" className="block">
              Length
            </label>
            <input
              type="number"
              name="length"
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Length"
            />
            <div className="flex justify-end items-center">
              <button
                onClick={() => setShowModal(false)}
                className="border p-3 text-sm text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitEvent}
                className="bg-black p-3 text-white ml-2"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Neweventform;
