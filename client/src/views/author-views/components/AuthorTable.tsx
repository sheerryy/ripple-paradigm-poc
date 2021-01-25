import {useDispatch, useSelector} from "react-redux";
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent, Snackbar,
} from "@material-ui/core";
import {Alert, Color, Skeleton} from "@material-ui/lab";

import { deleteAuthor, getAuthors } from "../../../apis/authors/authors.api";
import { BasicTable } from "../../../components";
import { camelCaseToNormal } from "../../../utils";
import { AuthorsResponse } from "../../../types/dtos";
import SaveAuthorForm from "./SaveAuthorForm";
import {AppState} from "../../../redux/types/App.type";
import {getAuthorsAsync} from "../../../redux/actions/Author.action";

function AuthorTable(){
  const authorState = useSelector((state: AppState) => state.author);
  const dispatch = useDispatch()

  const [selectedAuthor, setSelectedAuthor] = useState<AuthorsResponse | undefined>(undefined);
  const [saveAuthorModal, setSaveAuthorModal] = useState<{ open: boolean, title: string }>({
    open: false,
    title: 'Add new Author',
  });
  const [deleteAuthorModal, setDeleteAuthorModal] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<{ open: boolean, message: string, severity: Color }>({
    open: false,
    message: '',
    severity: 'error'
  });

  useEffect(() => {
    if (authorState.authors.length === 0) {
      dispatch(getAuthorsAsync());
    }
  }, []);

  const fetchData = async () => {
    const result: any = await getAuthors();

    console.log(`result`, result)
    if (result.errorCode) {
      console.log(result.message)
    } else {
      dispatch(getAuthorsAsync());
    }
  };


  const handleCreateAction = () => {
    setSelectedAuthor(undefined);
    setSaveAuthorModal({
      open: true,
      title: 'Add new Author.'
    });
  }

  const handleEditAction = (id: string) => {
    console.log(`edit: ${id}`);
    setSelectedAuthor(authorState.authors.find((author) => author.id === id));
    setSaveAuthorModal({
      open: true,
      title: `Save Author: ${id}`
    });
  }

  const handleDeleteAction = (id: string) => {
    console.log(`delete: ${id}`);
    setSelectedAuthor(authorState.authors.find((author) => author.id === id));
    setDeleteAuthorModal(true);
  }

  const handleDeleteAuthor = async (id?: string) => {
    if (id) {
      const response: any = await deleteAuthor(id);

      if (response.error) {
        setSnackBar({
          open: true,
          severity: 'error',
          message: 'Error deleting Author.'
        });
      } else {
        handleDeleteAuthorDialogClose();
      }
    } else {
      setSnackBar({
        open: true,
        severity: 'error',
        message: 'Id not found.'
      })
    }
  }

  const handleAuthorDialogClose = () => {
    setSaveAuthorModal((obj) => ({ ...obj, open: false }));
    fetchData();
  }

  const handleDeleteAuthorDialogClose = () => {
    setDeleteAuthorModal(false);
    fetchData();
  }

  return authorState.authors?.length ?
    <div>
      <BasicTable
        title="Authors"
        actions={{
          action: true,
          allowCreate: true,
          handleCreate: handleCreateAction,
          editAction: true,
          handleEdit: handleEditAction,
          deleteAction: true,
          handleDelete: handleDeleteAction,
        }}
        tableHeadings={Object.keys(authorState.authors[0]).map((heading) => camelCaseToNormal(heading))}
        tableData={authorState.authors.map((author) => Object.values(author))}
        tableDataIds={authorState.authors.map((author) => author.id)}
      />
      <Dialog
        open={saveAuthorModal.open}
        onClose={handleAuthorDialogClose}
        aria-labelledby="save-author"
        aria-describedby="dialog to save author"
      >
        <DialogTitle id="alert-dialog-title">{saveAuthorModal.title}</DialogTitle>
        <DialogContent>
          <SaveAuthorForm author={selectedAuthor} handleClose={handleAuthorDialogClose}/>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteAuthorModal}
        onClose={handleDeleteAuthorDialogClose}
        aria-labelledby="delete-author"
        aria-describedby="dialog to delete author"
      >
        <DialogTitle id="alert-dialog-title">Delete Author: {selectedAuthor?.id}</DialogTitle>
        <DialogContent>
          Are you sure that you want to delete Author <b>{selectedAuthor?.name}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAuthorDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteAuthor(selectedAuthor?.id)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={5000}
        onClose={() => setSnackBar((obj) => ({ ...obj, open: false }))}>
        <Alert severity={snackBar.severity}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
    :
    <Skeleton variant="rect" height={400} />;
}

export default AuthorTable;