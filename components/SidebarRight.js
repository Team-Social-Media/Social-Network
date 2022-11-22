import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function SidebarRight() {

  return (
    <>

      <Container sx={{ height: '88vh', top: '10vh', margin: 'auto', width: 'auto', backgroundColor: '#668F80', position: 'fixed', boxShadow: '5px 5px 5px grey', flex: 'grow', borderRadius: '15px 5px 15px 15px', flex: 'grow' }}>
        <div>
          <h1>Right Sidebar</h1>
          <article>
            <h2>Whats New in the Media</h2>
          </article>
          <article>
            <h2>Suggested Friends</h2>
          </article>
        </div>
        <div sx={{display: 'flex', flex: 'bottom'}}>
          <h6> &copy;Social Media</h6>
        </div>

      </Container>
    </>
  )
}

export default SidebarRight;