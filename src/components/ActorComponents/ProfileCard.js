import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";

import { useStyles } from "./ProfileCardStyle";

const ProfileCard = ({ actorInfo }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={actorInfo.Name} subheader="Actor" />
      <CardContent>
        {actorInfo && (
          <img
            style={{ width: "300px" }}
            src={`http://localhost:1337${actorInfo.Image[0].url}`}
            alt={actorInfo.Name}
          />
        )}

        <Typography component="h3">Biography:</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.biography}
        >
          {actorInfo.Biography}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
