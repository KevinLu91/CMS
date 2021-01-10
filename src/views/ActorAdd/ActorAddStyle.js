import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
  card: {
    padding: 30,
    marginBottom: 30,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
