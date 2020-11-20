import React from "react";
import {Grid, Paper} from "@material-ui/core";
import {BasicTable} from "../../components";

function AuthorView() {
  return (
    <Grid container justify="center">
      <Grid item sm={12} md={10}>
        <Paper style={{padding: '2em', height: '100%'}}>
          <BasicTable></BasicTable>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AuthorView;