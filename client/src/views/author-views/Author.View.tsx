import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { Grid, Paper } from '@material-ui/core';

import { getConfig } from '../../config';
import AuthorTable from './components/AuthorTable';

const { SOCKET_ENDPOINT } = getConfig();

function AuthorView() {

  useEffect(() => {
    const setListeners = () => {
      console.log('useEffect()')
      const socketClient = socketIOClient(SOCKET_ENDPOINT);
      socketClient.on('connect', () => console.log('connected'));
      socketClient.on('context/authors', function(msg: string){
        console.log('authors', msg);
      });
    }

    setListeners()
  }, []);

  return (
    <Grid container justify="center">
      <Grid item sm={12} md={10}>
        <Paper style={{padding: '2em', height: '100%'}}>
          <AuthorTable />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AuthorView;