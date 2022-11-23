import { Card, Grid, CardMedia } from '@mui/material';
import { Box } from '@mui/system';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Login from '../components/Login';
import styles from '../styles/Landing.module.css';
import Image from 'next/image';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }

  const myLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }
}

export default function LandingLogin() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '90vh' }}
      >

        <Grid
          item
          xs={3}
        >

          <Card className={styles.login}>
            <Box sx={{margin: '50px', height: '45vh' }}>
              <h1 className={styles.h1}>Welcome to!</h1>
              <Box sx={{margin: 'auto', alignContent: 'center'}}>
                  <Image
                    src='/merakist-CNbRsQj8mHQ-unsplash.jpg'
                    alt='login intro photo'
                    width={400}
                    height={240}
                  />
              </Box>
              <h3 className={styles.h3}>Please sign in to get started</h3>
              <div className={styles.button}>
                <Login />
              </div>
            </Box>
          </Card>
        </Grid>

      </Grid>
    </>
  );
}
