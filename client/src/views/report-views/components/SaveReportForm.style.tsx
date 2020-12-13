import { createStyles, Theme } from "@material-ui/core";

export const SaveReportFormStyle = ({ spacing }: Theme) => createStyles({
  textField: {
    margin: `${spacing(1)}px 0px ${spacing(1)}px`
  },
  formControl: {
    margin: spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: `${spacing(1)}px 0px ${spacing(2)}px`
  }
});