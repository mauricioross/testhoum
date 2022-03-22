import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/atoms/header/header'
// import styles from '../styles/Home.module.scss'
import houmLogo from '../assets/houmLogo.svg';
import LandingPage from './landingPage/landingPage';




const Home: NextPage = (props:any) => {
  const headerData = {
      logo:houmLogo,
  }
  return (
    <div>
      <Head>
        <title>Houm + Pokemón</title>
        <meta name="description" content="Test Houm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header {...headerData}></Header>
      <main>
      <LandingPage ></LandingPage>
      </main>

      <footer >
      
      </footer>
    </div>
  )
}

export default Home
