import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography, Paper,
} from "@material-ui/core";

import {createAuthor } from "../../../apis/authors/authors.api";
import { AuthorsRequest } from "../../../types/dtos";

interface PropTypes {
  handleClose: () => void,
}

function SaveAuthorForm({ handleClose }: PropTypes){
  const [author, setAuthor] = useState<AuthorsRequest>({
    name: ''
  });

  const [error, setError] = useState<{ error: boolean, message: string}>({
    error: false,
    message: '',
  })

  const handleChange = (property: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor((authorState) => ({
      ...authorState,
      [property]: event?.target?.value,
    }));
  };

  const HandleAddAuthor = async () => {
    if (!author.name) {
      setError({
        error: true,
        message: 'Author name is required.'
      });
      return ;
    } else {
      setError({
        error: false,
        message: ''
      });
    }

    const response: any = await createAuthor(author);

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
    <Paper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Add Author</Typography>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              variant="filled"
              error={error.error}
              id="filled-basic"
              label="Author Name"
              helperText={error.message}
              onChange={handleChange('name')}
            />
          </form>
        </Grid>
        <Grid xs={6}>
          <Button onClick={HandleAddAuthor} variant="contained" color="primary">
            Add
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SaveAuthorForm;