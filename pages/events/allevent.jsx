import React, { Fragment, useState } from "react";
import { getSession, useSession, signOut } from "next-auth/client";
import { BsLink45Deg } from "react-icons/bs";
import { BsFolderSymlinkFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import Eventlisting from "../../components/eventlisting";
import Link from "next/link";
import Sidebar from '../../components/Sidebar'
import Booking from "../../components/Booking";
import Event from '../../components/Event'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



function Allevent(props) {
  
  const [state, setState] = useState('event')
  return (
    <Fragment>
      <div className="flex flex-row ">
        <Sidebar setState={setState} />
        {state === "event" && (
          <Eventlisting events={props.getEvents} authUser={props.authUser} />
        )}

        {state === "booking" && (
          <Booking upcomingEvent={props.upComingEvents} />
        )}
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const id = session.user.id
  
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const authUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      email: true,
      username: true,
      id: true
    }
  })

  // find upcoming Events
  const  upComingEvents = await prisma.event.findMany({
    where: {
      userId: id,
      upcoming: true,
    },
    include: {
      recipient : true
    }
    // include: {
    //   recipient: {
    //     where: {
    //       eventId: id,
    //     },
    //     select: {
    //       name: true,
    //       email: true,
    //       note: true,
    //       date: true,
    //     },
    //   },
    // },
  });
  console.log(JSON.stringify(upComingEvents));


  // find auth user created events 
  const getEvents = await prisma.event.findMany({
    where: {
      email: session.user.email
    },
    select: {
      id: true,
      title: true,
      url: true,
      description: true,
      length: true
    }
  })

  // getPastEvent
  const pastEvent = await prisma.reciepient.findMany({
    
  })
 
  return {
    props: {
      authUser,
      getEvents,
      upComingEvents: JSON.parse(JSON.stringify(upComingEvents)),
    },
  };
}

export default Allevent;
