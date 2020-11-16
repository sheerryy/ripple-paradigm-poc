import { createStyles, Theme } from "@material-ui/core";

export const BasicTableStyle = ({ spacing }: Theme) => createStyles({
  tableRoot: {
    flexGrow: 1,
  },
  tableTitle: {
    margin: `${spacing(1.2)}px 0px`
  },
  table: {
    minWidth: 650,
  },
});