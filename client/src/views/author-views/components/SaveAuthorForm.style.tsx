import { createStyles, Theme } from "@material-ui/core";

export const SaveAuthorFormStyle = ({ spacing }: Theme) => createStyles({
  textField: {
    margin: `${spacing(1)}px 0px ${spacing(1)}px`
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: `${spacing(1)}px 0px ${spacing(2)}px`
  }
});