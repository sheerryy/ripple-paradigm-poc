import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  withStyles,
  WithStyles,
} from '@material-ui/core';

import { createAuthor } from '../../../apis/authors/authors.api';
import { AuthorsRequest } from '../../../types/dtos';
import { SaveAuthorFormStyle } from './SaveAuthorForm.style';

interface PropTypes extends WithStyles<typeof SaveAuthorFormStyle> {
  handleClose: () => void,
}

function SaveAuthorForm({ handleClose, classes }: PropTypes){
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
      <Grid container>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              variant="filled"
              error={error.error}
              id="filled-basic"
              label="Author Name"
              fullWidth={true}
              helperText={error.message}
              onChange={handleChange('name')}
            />
          </form>
        </Grid>
        <Grid className={classes.buttonContainer} xs={6}>
          <Button
            className={classes.button}
            onClick={HandleAddAuthor}
            variant="contained"
            color="primary">
            Add
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

export default withStyles(SaveAuthorFormStyle, { withTheme: true })(SaveAuthorForm);