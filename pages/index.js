import Head from 'next/head';
import styles from '../styles/Home.module.css'

// needed for auth
import React from 'react';
import Link from 'next/link';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';

// needed for structure and css
import Header from '../components/Header.js'
import Sidebar from '../components/Sidebar'
import SidebarRight from '../components/SidebarRight'
import MediaItem from '../components/MediaItem'
import Footer from '../components/Footer'
import { Grid, Pagination, Container } from '@mui/material'
import { useEffect, useState } from 'react';
// import Testing from './testing'

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

export default function Home() {
  // const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const pageSize = 6;
  const numPages = Math.ceil(data.length / pageSize);
  const startingData = (page - 1) * pageSize;
  const endingData = startingData + pageSize;

  const { data: session, status } = useSession();
    console.log('profile.js session: ', session)

  const user = {
    email: session.user.email,
    name: session.user.name,
    favorites: [],
  }

  const handleFavorites = (favItem) => {
    if(user.favorites.includes(favItem)) {
      let i = user.favorites.indexOf(favItem);
      user.favorites.splice(i, 1);
    } else {
      user.favorites.push(favItem);
    }
    console.log('user: ', user)
    console.log('user favorites: ', user.favorites)
  }

  return (
    <>
      <Head>
        <title>Social Media</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Grid className={styles['main-grid']} container spacing={3}>
      <Grid item xs={12}>
          <Container sx={{height: '5vh'}}></Container>
        </Grid>
        <Grid item xs={2}>
          <Sidebar setData={setData} />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            {data.slice(startingData, endingData).map(item => (
              <Grid key={item.id} item xs={4}>
                <MediaItem item={item} 
                handleFavorites={handleFavorites}/>
              </Grid>
            ))}
          </Grid>
          {data.length > 0 ? <Pagination onChange={(_, page) => setPage(page)} count={numPages} /> : null}
        </Grid>
        <Grid item xs={2}>
          <SidebarRight />
        </Grid>
      </Grid>
    {/* <Testing /> */}
      <div className={styles.footer}>
        <Footer />
      </div>
    </>

  )
}
