import React, { Fragment, useRef, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Link from 'next/link'
import { getSession } from "next-auth/client";

async function createNewUser(username, email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-type": "application/json",
    },
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }else {
   await Router.push('/authLogin')
  }
  return data;
}

function AuthSignUp() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  


  async function handleSubmit(event) {
    event.preventDefault();
    
    const enteredUserName = userNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
   
    try {
      const result = await createNewUser(
        enteredUserName,
        enteredEmail,
        enteredPassword
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <div className="flex flex-col items-center px-20 gap-20 pt-30 sm:pt-10  justify-center h-screen sm:flex-row bg-white">
        <div className="basis-96">
          <h4 className="font-sans text-xl font-bold py-4">Cal.com</h4>
          <h2 className="font-sans text-4xl font-extrabold py-3">
            Youre one step <br />
            away from <br />
            simpler <br />
            scheduling
          </h2>
          <p className="text-gray-400 text-base pt-5 pb-2">
            I love being able to use a tool that just works, and that is open
            source. As a developer, I love being empowered to contribute toa
            tool that I use regularly
          </p>
          <div className="flex flex-row">
            <div className="flex flex-row gap-3">
              <div>
                <Image
                  src="/public/man.jpg"
                  alt="man pix"
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <p>
                  <span className="font-bold">Cassidy Williams</span>{" "}
                  <span className="text-blue-400"> @cassidoo</span>
                </p>
                <p className="font-sans text-sm text-gray-400">
                  Director of Developer Experience at Netlify
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* end of flex-item 1 */}
        <div className="basis-96 border-2 rounded-md px-5 pt-2 ">
          <h2 className="font-sans text-xl font-bold">
            Start your 14-days free trial
          </h2>
          <p className="text-gray-400 text-sm leading-4 pb-5">
            No credit card required. Try all pro features for 14 days. Upgrade
            at any time to pro for $12/month
          </p>
          {/* Signup from */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="username"
              id="username"
              required
              placeholder="username"
              ref={userNameRef}
              className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              placeholder="email"
              className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              ref={passwordRef}
              className="w-full px-4 py-2 my-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <button className="w-full bg-black mt-2 text-white py-2 rounded-md">
              Sign up for free
            </button>
          </form>
          <p className="py-1 text-gray-500">
            Already have an account?
            <span>
              <Link href="/authLogin"> Sign in</Link>
            </span>
          </p>

          <footer className="border mt-2 w-full bg-grey py-4 px-3">
            <p className="text-xs font-sans ">
              <span className="text-gray-400">
                By signing up, you agree to our{" "}
              </span>
              <span className="font-bold">terms of service</span> and
              <span className="font-bold"> Privacy policy.</span> <br />
              Need help? <span className="font-bold">Get in touch</span>
            </p>
          </footer>
        </div>
      </div>
    </Fragment>
  );
}

export default AuthSignUp;

export async function getServerSideProps(context) {
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
