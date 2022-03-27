import '../styles/globals.css'
import '../public/output.css'
import type { AppProps } from 'next/app'
import {Provider} from 'next-auth/client'
import Sidebar from '../components/Sidebar'
import { getSession, useSession } from "next-auth/client";
import {useEffect} from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [session, loading] = useSession();
  return (
    <div className="">
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp
