import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Index from "../../index";

function Dynamic(props) {
  const { title, description, username, length } = props.findEvent;
  const [datetime, setDatetime] = useState(new Date());
  const [state, setState] = useState(false);
  const router = useRouter();
  const [eventId, seteventId] = useState(router.query.id);


  function getSelectedEvent(e) {
    console.log(e.target.value)
    setDatetime(e.target.value);
    //   const date = new Date();
    //   datetime.valueAsDate = date
    // //   date.setMilliseconds(0);
    // router.push({
    //   pathname: "/[username]",
    //   query: { username: username, date: `${datetime}`, id: id },
    // });
  }
  const onSubmit = (evt) => {
    evt.preventDefault()
    router.push({
      pathname: "/[username]",
      query: {
        username: username,
        date: `${new Date(datetime)}`,
        id: eventId,
      },
    });
  };
  
  return (
    <Fragment>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-700 ">
        <div className="flex flex-row items-center border-2 justify-center rounded-md">
          <div className="px-7 py-5">
            <p className="font-semibold text-gray-400 text-xl py-2">
              {username}
            </p>
            <h2 className="font-bold py-3 text-xl capitalize">{description}</h2>
            <div>
              <p className="font-sans text-lg text-gray-500">{`${length} Minutes`}</p>
            </div>
            <p className="font-sans text-lg text-gray-400">{description}</p>
          </div>
          <div className="px-5 py-5">
            <form onSubmit={onSubmit}>
              <label
                className="text-lg text-gray-400 py-2"
                htmlFor="meeting-time"
              >
                Choose a time for your appointment:
              </label>
              <input
                type="datetime-local"
                name="meeting-time"
                id="meeting-time"
                value={datetime}
                className="block"
                onChange={getSelectedEvent}
              />
              <button className="bg-black text-white py-3 px-4 mt-4 rounded-md uppercase" type="submit">Submit</button>
             
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dynamic;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession({ req: context.req });
  const email = session.user.email

  const findEvent = await prisma.event.findFirst({
    where: {
      id: parseInt(id),
    },
    select: {
      title: true,
      description: true,
      length: true,
      username: true,
    },
  });

  // const findUser = await prisma.user.findFirst({
  //   where: {
  //     email: email
  //   },
  //   select:{
  //     id: true
  //   }
  // })
 
  return {
    props: { findEvent },
  };
}
