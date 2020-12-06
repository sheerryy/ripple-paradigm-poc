import React from 'react';
import {
  Grid,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  withStyles,
  Typography,
  IconButton,
  TableContainer,
} from '@material-ui/core';
import {
  EditOutlined,
  RemoveCircleOutlined,
  AddCircleOutlined,
} from '@material-ui/icons';

import { BasicTableStyle } from './BasicTable.style';

interface PropTypes {
  classes: {
    tableRoot: string,
    table: string,
    tableTitle: string,
  },
  title: string,
  actions: {
    action: boolean,
    allowCreate: boolean,
    handleCreate?: () => void,
    editAction?: boolean,
    handleEdit?: (id: string) => void,
    deleteAction?: boolean,
    handleDelete?: (id:string) => void,
  },
  tableHeadings: string[],
  tableData: string[][],
  tableDataIds: string[],
}

function BasicTable({
  classes,
  title,
  actions = { action: false, allowCreate: false },
  tableHeadings = [],
  tableData,
  tableDataIds,
}: PropTypes) {
  const handleOnclick = (eventAction: 'create' | 'edit' | 'delete') => (id?: string) => {
    switch (eventAction) {
      case 'create':
        if (actions.handleCreate) {
          actions.handleCreate();
        } else {
          console.warn(`${title} Table create handler is not provided`);
        }
        break;
      case 'edit':
        if (id && actions.handleEdit) {
          actions.handleEdit(id);
        } else {
          console.warn(`${title} Table edit handler is not provided`);
        }
        break;
      case 'delete':
        if (id && actions.handleDelete) {
          actions.handleDelete(id);
        } else {
          console.warn(`${title} Table delete handler is not provided`);
        }
        break;
    }
  }

  return (
    <div className={classes.tableRoot}>
      <Grid container>
        <Grid xs={actions.allowCreate ? 9 : 12}>
          <Typography className={classes.tableTitle} variant="h5" align="left">
            {title}
          </Typography>
        </Grid>
        {actions.allowCreate ?
          <Grid xs={3}>
            <IconButton
              aria-label="create"
              onClick={() => handleOnclick('create')()}
            >
              <AddCircleOutlined />
            </IconButton>
          </Grid> :
          <></>}
      </Grid>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadings.map((heading, headinIndex) => <TableCell key={headinIndex}>{heading}</TableCell>)}
            {
              actions?.action && <TableCell>Actions</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
              {actions.action &&
                <TableCell key={`action-${rowIndex}`}>
                  { actions.editAction &&
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleOnclick('edit')(tableDataIds[rowIndex])}
                  >
                    <EditOutlined />
                  </IconButton>
                  }
                  { actions.deleteAction &&
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleOnclick('delete')(tableDataIds[rowIndex])}
                  >
                    <RemoveCircleOutlined />
                  </IconButton>
                  }
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default withStyles(BasicTableStyle, { withTheme: true })(BasicTable);
