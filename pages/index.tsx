import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AuthLogin from '../pages/authLogin'
import AuthSignup from '../pages/authSignup'


const Home: NextPage = () => {
  return (
    <div>
      <AuthLogin />
    </div>
  );
};

export default Home;
