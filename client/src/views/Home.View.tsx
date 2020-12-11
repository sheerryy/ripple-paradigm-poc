import React from "react";
import { Grid, Typography } from "@material-ui/core";
import AuthorTable from "./author-views/components/AuthorTable";

function HomeView() {
  return (
    <div className="home">
      <Grid container justify="center">
        <Grid item sm={12} md={10}>
          <AuthorTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeView;