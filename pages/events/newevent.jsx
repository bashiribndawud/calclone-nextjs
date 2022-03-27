import React, {useState} from 'react'
import {getSession} from 'next-auth/client'

function Newevent() {
    const [showModal, setShowModal] = useState(false)
  return (
    <div>
       
    </div>
  )
}

export default Newevent



export async function getServerSideProps(context) {
  const session = getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}