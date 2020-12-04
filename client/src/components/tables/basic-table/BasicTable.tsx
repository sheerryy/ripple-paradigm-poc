import React from 'react';
import {
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
import { EditOutlined, RemoveCircleOutlined } from '@material-ui/icons';

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
  actions = { action: false },
  tableHeadings = [],
  tableData,
  tableDataIds,
}: PropTypes) {
  const handleOnclick = (eventAction: 'edit' | 'delete') => (id: string) => {
    switch (eventAction) {
      case "edit":
        if (actions.handleEdit) {
          actions.handleEdit(id);
        }
        break;
      case "delete":
        if (actions.handleDelete) {
          actions.handleDelete(id);
        }
        break;
    }
  }

  return (
    <div className={classes.tableRoot}>
      <Typography className={classes.tableTitle} variant="h5" align="left">
        {title}
      </Typography>
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
