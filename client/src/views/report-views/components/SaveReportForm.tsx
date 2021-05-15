import React, {useEffect, useState} from 'react';
import {
  Grid,
  Select,
  Button,
  MenuItem,
  TextField,
  withStyles,
  WithStyles,
  InputLabel,
  FormControl,
} from '@material-ui/core';

import { createReport, updateReport } from '../../../apis/reports/reports.api';
import { AuthorsResponse, ReportsRequest, ReportsResponse } from '../../../types/dtos';
import { SaveReportFormStyle } from './SaveReportForm.style';

interface PropTypes extends WithStyles<typeof SaveReportFormStyle> {
  handleClose: () => void,
  authors: AuthorsResponse[],
  report?: ReportsResponse,
}

function SaveReportForm({
  classes,
  handleClose,
  authors,
  report: propReport
}: PropTypes){
  const [report, setReport] = useState<ReportsRequest>({
    title: '',
    authorId: '',
    data: [{
      paragraph: '',
      heading: ''
    }]
  });
  const [isEditMod, setIsEditMod] = useState<boolean>(false);

  const [error, setError] = useState<{ error: boolean, message: string}>({
    error: false,
    message: '',
  });

  useEffect(() => {
    if(propReport?.id) {
      setIsEditMod(true);
      setReport({
        data: propReport.data,
        authorId: propReport.Author.id,
        title: propReport.title
      });
    }
  }, []);

  const handleChange = (property: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setReport((reportState) => ({
      ...reportState,
      [property]: event?.target?.value,
    }));
  };

  const handleDataChange = (property: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setReport((reportState) => ({
      ...reportState,
      data: [{...reportState.data[0], [property]: event?.target?.value }],
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setReport((reportState) => ({
      ...reportState,
      authorId: event.target.value as string,
    }));
  }

  const HandleSaveReport = async () => {
    if (!report.title) {
      setError({
        error: true,
        message: 'Report title is required.'
      });
      return ;
    } else if (!report.data.length) {
      setError({
        error: true,
        message: 'Report data is required.'
      });
      return ;
    } else if (!report.authorId) {
      setError({
        error: true,
        message: 'Report authorId is required.'
      });
      return ;
    } else {
      setError({
        error: false,
        message: ''
      });
    }

    let response: any;

    if (isEditMod && propReport?.id) {
      response = await updateReport(propReport.id, report)
    } else {
      response = await createReport(report);
    }

    if (response.error) {
      setError({
        error: true,
        message: response.message,
      })
    } else {
      handleClose();
    }

  }

  return (
      <Grid container>
        <Grid item xs={12}>
            <TextField
              className={classes.textField}
              variant="filled"
              error={error.error}
              id="filled-basic"
              label="Report Title"
              fullWidth={true}
              helperText={error.message}
              value={report.title}
              onChange={handleChange('title')}
            />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="report-author-id-input">Author</InputLabel>
            <Select
              labelId="report-author-id-input"
              id="report-author-id-select"
              onChange={handleSelectChange}
              defaultValue={propReport?.Author.id}
              fullWidth={true}
            >
              {authors.map((author, authorIndex) => (
                <MenuItem key={author.id + authorIndex} value={author.id}>{author.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="filled"
            error={error.error}
            id="filled-basic"
            label="Report Heading"
            fullWidth={true}
            helperText={error.message}
            value={report.data[0].heading}
            onChange={handleDataChange('heading')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="filled"
            error={error.error}
            id="filled-basic"
            label="Report Paragraph"
            fullWidth={true}
            helperText={error.message}
            value={report.data[0].paragraph}
            onChange={handleDataChange('paragraph')}
          />
        </Grid>
        <Grid className={classes.buttonContainer} xs={6}>
          <Button
            className={classes.button}
            onClick={HandleSaveReport}
            variant="contained"
            color="primary">
            {isEditMod ? 'Save': 'Add' }
          </Button>
        </Grid>
        <Grid className={classes.buttonContainer} xs={6}>
          <Button
            className={classes.button}
            onClick={handleClose}
            variant="contained"
            color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
  );
}

export default withStyles(SaveReportFormStyle, { withTheme: true })(SaveReportForm);
