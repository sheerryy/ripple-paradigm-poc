import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { getAuthors } from "../../../apis/authors/authors.api";
import {BasicTable} from "../../../components";
import {camelCaseToNormal} from "../../../utils";
import {AuthorsResponse} from "../../../types/dtos";
import SaveAuthorForm from "./SaveAuthorForm";

function AuthorTable(){
  const [authors, setAuthors] = useState<AuthorsResponse[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorsResponse | undefined>(undefined);
  const [saveAuthorModal, setSaveAuthorModal] = useState<{ open: boolean, title: string }>({
    open: false,
    title: 'Add new Author',
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedAuthor) {
      setSaveAuthorModal({
        open: true,
        title: `Save Author: ${selectedAuthor?.id}`
      })
    }
  }, [selectedAuthor]);

  const fetchData = async () => {
    const result: any = await getAuthors();

    console.log(`result`, result)
    if (result.errorCode) {
      console.log(result.message)
    } else {
      setAuthors(result);
    }
  };


  const handleCreateAction = () => {
    setSaveAuthorModal({
      open: true,
      title: 'Add new Author.'
    });
  }

  const handleEditAction = (id: string) => {
    console.log(`edit: ${id}`);
    setSelectedAuthor(authors.find((author) => author.id === id));
  }

  const handleDeleteAction = (id: string) => {
    console.log(`delete: ${id}`);
    // setSelectedAuthor(authors.find((author) => author.id === id));
    // setEditAuthorModal(true);
  }

  const handleAuthorDialogClose = () => {
    setSaveAuthorModal((obj) => ({ ...obj, open: false }));
    fetchData();
  }

  return authors?.length ?
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
        tableHeadings={Object.keys(authors[0]).map((heading) => camelCaseToNormal(heading))}
        tableData={authors.map((author) => Object.values(author))}
        tableDataIds={authors.map((author) => author.id)}
      />
      <Dialog
        open={saveAuthorModal.open}
        onClose={handleAuthorDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{saveAuthorModal.title}</DialogTitle>
        <DialogContent>
          <SaveAuthorForm author={selectedAuthor} handleClose={handleAuthorDialogClose}/>
        </DialogContent>
      </Dialog>
    </div>
    :
    <Skeleton variant="rect" height={400} />;
}

export default AuthorTable;