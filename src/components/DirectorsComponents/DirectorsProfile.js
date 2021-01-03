import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useStyles } from "../ActorComponents/ProfileCardStyle";

const DirectorsProfile = ({ directorList }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      {directorList.length > 0 ? (
        directorList.map((director) => (
          <Card
            className={classes.root}
            key={director.id}
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/director/${director.id}`)}
          >
            <CardHeader title={director.Name} subheader="Director" />
            <CardContent>
              {directorList && (
                <img
                  style={{ width: "300px" }}
                  src={`http://localhost:1337${director.Image[0].formats.medium.url}`}
                  alt={director.Name}
                />
              )}
              <Typography component="h3">Biography:</Typography>
              <Typography
                className={classes.biography}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {director.Biography}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No directors...</div>
      )}
    </>
  );
};

export default DirectorsProfile;
