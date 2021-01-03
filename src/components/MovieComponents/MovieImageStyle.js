import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginBottom: 25,
  },
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  img: {
    width: "200px",
    marginRight: "10px",
  },
}));
