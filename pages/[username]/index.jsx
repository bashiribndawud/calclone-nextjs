import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useSession, getSession } from "next-auth/client";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsFillCalendar2EventFill } from "react-icons/bs";

function Index(props) {
  const [session, loading] = useSession();
  const { title, description, length, username } = props.event;
  const { id: userId } = props.authUser;
  const router = useRouter();
  const { date } = router.query;
  console.log(date);
  const { id } = router.query;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [guestvalue, setGuestValue] = useState("");
  const [guest, setGuest] = useState(false);

  async function createRecepient(
    name,
    email,
    note,
    date,
    guest = null,
    eventId,
    userId
  ) {
    const response = await fetch("/api/recepient/create", {
      method: "POST",
      body: JSON.stringify({ name, email, note, date, guest, id, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(response);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      router.push({
        pathname: "/[username]/success",
        query: {
          username: username,
          success: true,
          date: date,
          name: name,
          email: email,
          description: description,
          length: length,
        },
      });
    }
    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await createRecepient(
      name,
      email,
      note,
      date,
      guestvalue,
      id
    );
    if (!result.error) {
      Router.push({
        pathname: "/[username]/success",
        query: { username: username, success: true },
      });
    }
  }

  function handleCancel() {
    router.push({
      pathname: "/[username]/[title]/[id]",
      query: { username: username, title: title, id: parseInt(id) },
    });
  }

  return (
    <Fragment>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border-2 border-gray-600 py-5 px-5 gap-5 flex rounded-md justify-center items-start">
          <div className="">
            <p className=" text-gray-500 text-2xl uppercase">{username}</p>
            <h2 className="text-black text-4xl font-bold py-2">{title}</h2>
            <div className="flex gap-3 justify-start items-center mt-4">
              <MdAccessTimeFilled className="text-gray-400 text-xl" />
              <p className="text-gray-400">{`${length} Min`}</p>
            </div>
            <div className="flex items-center gap-3 py-3">
              <BsFillCalendar2EventFill
                style={{ color: "green" }}
                className="text-white"
              />
              <p style={{ color: "green" }} className="text-white">
                {date}
              </p>
            </div>
            <p className="text-gray-400 text-xl py-2">{description}</p>
          </div>
          {/* End of flex item 1 */}
          <div className=" basis-96 ">
            <form>
              <label htmlFor="name" className="text-black">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                className="w-full px-4 text-black py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
              <label htmlFor="name" className="text-black">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full px-4 py-2 text-black my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
              <div>
                {guest ? (
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 text-black my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
                    value={guestvalue}
                    onChange={(e) => setGuestValue(e.target.value)}
                  />
                ) : (
                  <button
                    className="font-bold py-2"
                    onClick={() => setGuest(true)}
                  >
                    +additional guest
                  </button>
                )}
              </div>
              <label htmlFor="note" className="text-black mt-4">
                Additional Note
              </label>
              <textarea
                name="note"
                placeholder=""
                id=""
                value={note}
                onChange={(e) => setNote(e.target.value)}
                cols="10"
                rows="3"
                className="w-full px-4 py-2 my-2 border  text-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              ></textarea>
              <div className="flex flex-row gap-2">
                <button
                  onClick={handleSubmit}
                  className="border-2 text-black rounded-md py-2 px-3"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="border-2 bg-black text-white rounded-md py-2 px-3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Index;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession({ req: context.req });
  const userEmail = session.user.email;

  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      title: true,
      description: true,
      length: true,
      username: true,
    },
  });

  const authUser = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
    },
  });

  return {
    props: { event, authUser },
  };
}
