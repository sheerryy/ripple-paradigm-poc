import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";

import {createAuthor } from "../../../apis/authors/authors.api";
import { AuthorsRequest } from "../../../types/dtos";

function SaveAuthorForm(){
  const [author, setAuthor] = useState<AuthorsRequest>({
    name: ''
  });

  const [error, setError] = useState<{ error: boolean, message: string}>({
    error: false,
    message: '',
  })

  const handleChange = (property: string) => (event: InputEvent) => {
    setAuthor((authorState) => ({
      ...authorState,
      [property]: event?.target?.value,
    }));
  };

  const HandleAddAuthor = () => {
    if (!author.name) {
      setError({
        error: true,
        message: 'Author name is required.'
      });
    } else {
      setError({
        error: false,
        message: ''
      })
    }

    const response: any = await createAuthor(author);

    if (response.error) {
      setError({
        error: true,
        message: response.message,
      })
    } else {
      //closeModal(); or return author
    }

  }

  return (
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
      <Grid>
        <Button variant="contained" color="primary">
          Add
        </Button>
      </Grid>
    </Grid>
  );
}

export default SaveAuthorForm;