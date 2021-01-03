import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { useStyles } from "../ActorComponents/ProfileCardStyle";

const DirectorProfile = ({ directorInfo }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={directorInfo.Name} subheader="Director" />
      <CardContent>
        {directorInfo && (
          <img
            style={{ width: "300px" }}
            src={`http://localhost:1337${directorInfo.Image[0].formats.medium.url}`}
            alt={directorInfo.Name}
          />
        )}
        <Typography component="h3">Biography:</Typography>
        <Typography
          className={classes.biography}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {directorInfo.Biography}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DirectorProfile;
