import { createStyles, Theme } from "@material-ui/core";

export const NavBarStyle = (theme: Theme) => createStyles({
  navRoot: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});