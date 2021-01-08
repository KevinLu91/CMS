import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useStyles } from "../ActorComponents/ProfileCardStyle";

const ActorsProfile = ({ actorList }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      {actorList.length > 0 ? (
        actorList.map((actor) => (
          <Card
            className={classes.root}
            style={{ cursor: "pointer" }}
            key={actor.id}
            onClick={() => history.push(`/actor/${actor.id}`)}
          >
            <CardHeader title={actor.Name} subheader="Actor" />
            <CardContent>
              {actorList.length > 0 && (
                <img
                  style={{ width: "300px" }}
                  src={`http://localhost:1337${actor.Image[0].url}`}
                  alt={actor.Name}
                />
              )}
              <Typography component="h3">Biography:</Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.biography}
              >
                {actor.Biography}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No Actor...</div>
      )}
    </>
  );
};

export default ActorsProfile;
