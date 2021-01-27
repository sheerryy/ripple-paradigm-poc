import {useDispatch, useSelector} from "react-redux";
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

import { BasicTable } from "../../../components";
import { deleteReport } from "../../../apis/reports/reports.api";
import { ReportsResponse } from "../../../types/dtos";
import SaveReportForm from "./SaveReportForm";
import {AppState} from "../../../redux/types/App.type";
import {getAuthorsAsync} from "../../../redux/actions/Author.action";
import {getReportsAsync} from "../../../redux/actions/Report.action";

function ReportTable(){
  const reportState = useSelector((state: AppState) => state.report);
  const authorState = useSelector((state: AppState) => state.author);
  const dispatch = useDispatch()

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
    if (authorState.authors.length === 0) {
      dispatch(getAuthorsAsync());
    }
    if (reportState.reports.length === 0) {
      dispatch(getReportsAsync());
    }
  }, []);

  const fetchAuthorData = async () => {
    dispatch(getAuthorsAsync());
  };

  const fetchReportData = async () => {
    dispatch(getReportsAsync());
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
    setSelectedReport(reportState.reports.find((report) => report.id === id));
    setSaveReportModal({
      open: true,
      title: `Save Report: ${id}`
    });
  }

  const handleDeleteAction = (id: string) => {
    console.log(`delete: ${id}`);
    setSelectedReport(reportState.reports.find((report) => report.id === id));
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

  return reportState.reports?.length ?
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
        tableData={reportState.reports.map((report) => [report.id, report.title, report.Author.name])}
        tableDataIds={reportState.reports.map((report) => report.id)}
      />
      <Dialog
        open={saveReportModal.open}
        onClose={handleReportDialogClose}
        aria-labelledby="save-report"
        aria-describedby="dialog to save report"
      >
        <DialogTitle id="alert-dialog-title">{saveReportModal.title}</DialogTitle>
        <DialogContent>
          <SaveReportForm authors={authorState.authors} report={selectedReport} handleClose={handleReportDialogClose}/>
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