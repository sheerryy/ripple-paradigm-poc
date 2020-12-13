import React from "react";
import {Grid, Paper} from "@material-ui/core";
import ReportTable from "./components/ReportTable";

function ReportView() {
  return (
    <Grid container justify="center">
      <Grid item sm={12} md={10}>
        <Paper style={{padding: '2em', height: '100%'}}>
          <ReportTable />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ReportView;