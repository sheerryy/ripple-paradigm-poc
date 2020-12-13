import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  Snackbar,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { Alert, Color, Skeleton } from "@material-ui/lab";

import { deleteReport, getReports } from "../../../apis/reports/reports.api";
import { BasicTable } from "../../../components";
import { ReportsResponse, AuthorsResponse } from "../../../types/dtos";
import SaveReportForm from "./SaveReportForm";
import { getAuthors } from "../../../apis/authors/authors.api";

function ReportTable(){
  const [reports, setReports] = useState<ReportsResponse[]>([]);
  const [authors, setAuthors] = useState<AuthorsResponse[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportsResponse | undefined>(undefined);
  const [saveReportModal, setSaveReportModal] = useState<{ open: boolean, title: string }>({
    open: false,
    title: 'Add new Report',
  });
  const [deleteReportModal, setDeleteReportModal] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<{ open: boolean, message: string, severity: Color }>({
    open: false,
    message: '',
    severity: 'error'
  });

  useEffect(() => {
    fetchReportData();
    fetchAuthorData();
  }, []);

  const fetchAuthorData = async () => {
    const result: any = await getAuthors();

    console.log(`result`, result)
    if (result.errorCode) {
      console.log(result.message)
    } else {
      setAuthors(result);
    }
  };

  const fetchReportData = async () => {
    const result: any = await getReports();

    console.log(`result`, result)
    if (result.errorCode) {
      console.log(result.message)
    } else {
      setReports(result);
    }
  };

  const handleCreateAction = () => {
    setSelectedReport(undefined);
    setSaveReportModal({
      open: true,
      title: 'Add new Report.'
    });
  }

  const handleEditAction = (id: string) => {
    console.log(`edit: ${id}`);
    setSelectedReport(reports.find((report) => report.id === id));
    setSaveReportModal({
      open: true,
      title: `Save Report: ${id}`
    });
  }

  const handleDeleteAction = (id: string) => {
    console.log(`delete: ${id}`);
    setSelectedReport(reports.find((report) => report.id === id));
    setDeleteReportModal(true);
  }

  const handleDeleteReport = async (id?: string) => {
    if (id) {
      const response: any = await deleteReport(id);

      if (response.error) {
        setSnackBar({
          open: true,
          severity: 'error',
          message: 'Error deleting Report.'
        });
      } else {
        handleDeleteReportDialogClose();
      }
    } else {
      setSnackBar({
        open: true,
        severity: 'error',
        message: 'Id not found.'
      })
    }
  }

  const handleReportDialogClose = () => {
    setSaveReportModal((obj) => ({ ...obj, open: false }));
    fetchReportData();
  }

  const handleDeleteReportDialogClose = () => {
    setDeleteReportModal(false);
    fetchReportData();
  }

  return reports?.length ?
    <div>
      <BasicTable
        title="Reports"
        actions={{
          action: true,
          allowCreate: true,
          handleCreate: handleCreateAction,
          editAction: true,
          handleEdit: handleEditAction,
          deleteAction: true,
          handleDelete: handleDeleteAction,
        }}
        tableHeadings={['Id', 'Title', 'Author']}
        tableData={reports.map((report) => [report.id, report.title, report.Author.name])}
        tableDataIds={reports.map((report) => report.id)}
      />
      <Dialog
        open={saveReportModal.open}
        onClose={handleReportDialogClose}
        aria-labelledby="save-report"
        aria-describedby="dialog to save report"
      >
        <DialogTitle id="alert-dialog-title">{saveReportModal.title}</DialogTitle>
        <DialogContent>
          <SaveReportForm authors={authors} report={selectedReport} handleClose={handleReportDialogClose}/>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteReportModal}
        onClose={handleDeleteReportDialogClose}
        aria-labelledby="delete-report"
        aria-describedby="dialog to delete Report"
      >
        <DialogTitle id="alert-dialog-title">Delete Report: {selectedReport?.id}</DialogTitle>
        <DialogContent>
          Are you sure that you want to delete Report <b>{selectedReport?.title}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteReportDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteReport(selectedReport?.id)} color="primary" autoFocus>
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

export default ReportTable;