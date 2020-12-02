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
    editAction?: boolean
    deleteAction?: boolean,
  },
  tableHeadings: string[],
  tableData: string[][]
}

function BasicTable({ classes, title, actions = { action: false }, tableHeadings = [], tableData }: PropTypes) {
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
          </TableRow>
          {
            actions?.action && <TableRow>Actions</TableRow>
          }
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
              {actions.action &&
                <TableCell key={`action-${rowIndex}`}>
                  { actions.editAction &&
                    <EditOutlined />
                  }
                  { actions.deleteAction &&
                    <RemoveCircleOutlined />
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
