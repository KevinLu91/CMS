import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "55%",
    minWidth: "55%",
    marginBottom: "25px",
  },
  biography: {
    textAlign: "justify",
    marginTop: "10px",
  },
  button: {
    marginRight: "10px",
  },
}));
