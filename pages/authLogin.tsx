import React, {Fragment, useRef, useState, useEffect} from 'react'
import {useSession} from 'next-auth/client'
import Link from 'next/Link'
import { useRouter } from "next/router";
import {signIn, getSession} from 'next-auth/client'

function AuthLogin() {
   
    const router = useRouter()
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const  [session, loading] = useSession()

    // useEffect(() => {
    //  getSession().then((session) => {
    //    if(session){
    //      router.replace('/')
    //    }
    //  })
    // }, [router])

    async function submitHandler(e: any) {
      e.preventDefault();

      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password
      });
      // console.log(result)
      // console.log(session)
      // console.log(loading)

      if(!result.error){
        router.replace('/events/allevent')
      }
    }

  
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-mono text-2xl font-bold py-4">Cal.com</h1>
        <h3 className="font-mono text-xl font-semibold pb-3">
          Sign in to your account
        </h3>
        <form
          onSubmit={submitHandler}
          className="border rounded-md w-96 bg-white py-7 px-7 flex flex-col items-center justify-center"
        >
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-black mt-2 text-white py-2 rounded-md">
            Sign in
          </button>
        </form>
        <p className="text-gray-500 py-2">
          Dont have an account?
          <span>
            <Link href="/authSignup"> Create an account </Link>
          </span>
        </p>
      </div>
    </Fragment>
  );
}

export default AuthLogin;


export async function getServerSideProps(context:any) {
  console.log(context)
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/bookings",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}