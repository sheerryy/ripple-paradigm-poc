import React from "react";
import { Grid, Typography } from "@material-ui/core";

function HomeView() {
  return (
    <div className="home">
      <Grid container justify="center">
        <Grid item sm={12} md={10}>
          <Typography variant='h1'>Ripple Paradigm Home Page</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeView;