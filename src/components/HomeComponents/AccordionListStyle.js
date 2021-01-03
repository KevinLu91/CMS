import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    marginBottom: "10px",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  helperRight: {
    borderRight: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  accordion: {
    background: "#ffff7e",
    marginBottom: "15px",
  },
  description: {
    textAlign: "justify",
    marginTop: "10px",
  },
  img: {
    width: "100px",
    cursor: "pointer",
  },
}));
