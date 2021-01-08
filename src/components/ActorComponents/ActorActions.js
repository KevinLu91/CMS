import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
  Snackbar,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Alert from "@material-ui/lab/Alert";
import { useStyles } from "./ProfileCardStyle";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

const ActorActions = ({ actorInfo }) => {
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
  const classes = useStyles();
  const token = Cookie.get("token");
  const history = useHistory();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:1337/actors/${actorInfo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSnackbarSuccess(true);
        setTimeout(() => {
          history.push("/actors");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    history.push(`/actor/${actorInfo.id}/edit`);
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography className={classes.heading}>Actions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </AccordionDetails>
      </Accordion>
      <Snackbar
        open={snackbarSuccess}
        autoHideDuration={3000}
        onClose={() => setSnackbarSuccess(false)}
      >
        <Alert onClose={() => setSnackbarSuccess(false)} severity="success">
          Actor deleted!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ActorActions;
