import React, {useEffect, useState} from 'react';
import {
  Grid,
  Button,
  TextField,
  withStyles,
  WithStyles,
} from '@material-ui/core';

import {createAuthor, updateAuthor} from '../../../apis/authors/authors.api';
import { AuthorsRequest, AuthorsResponse } from '../../../types/dtos';
import { SaveAuthorFormStyle } from './SaveAuthorForm.style';

interface PropTypes extends WithStyles<typeof SaveAuthorFormStyle> {
  handleClose: () => void,
  author?: AuthorsResponse,
}

function SaveAuthorForm({
  classes,
  handleClose,
  author: propAuthor
}: PropTypes){
  const [author, setAuthor] = useState<AuthorsRequest>({
    name: ''
  });
  const [isEditMod, setIsEditMod] = useState<boolean>(false);

  const [error, setError] = useState<{ error: boolean, message: string}>({
    error: false,
    message: '',
  });

  useEffect(() => {
    if(propAuthor?.id) {
      setIsEditMod(true);
      setAuthor(propAuthor);
    }
  }, []);

  const handleChange = (property: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor((authorState) => ({
      ...authorState,
      [property]: event?.target?.value,
    }));
  };

  const HandleSaveAuthor = async () => {
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

    let response: any;

    if (isEditMod && propAuthor?.id) {
      response = await updateAuthor(propAuthor.id, author)
    } else {
      response = await createAuthor(author);
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
              label="Author Name"
              fullWidth={true}
              helperText={error.message}
              value={author.name}
              onChange={handleChange('name')}
            />
        </Grid>
        <Grid className={classes.buttonContainer} xs={6}>
          <Button
            className={classes.button}
            onClick={HandleSaveAuthor}
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

export default withStyles(SaveAuthorFormStyle, { withTheme: true })(SaveAuthorForm);