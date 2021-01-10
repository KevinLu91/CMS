import React from "react";
import { Button } from "@material-ui/core";

const ActorImages = ({ actorImages, setActorImages }) => {
  const handleDelete = (id) => {
    setActorImages(actorImages.filter((image) => image.id !== id));
  };

  return (
    <div style={{ marginTop: 30 }}>
      {actorImages.length > 0 &&
        actorImages.map((image) => (
          <div key={image.id}>
            <img
              style={{ width: 100 }}
              src={`http://localhost:1337${image.url}`}
              alt={image.id}
            />
            <Button onClick={() => handleDelete(image.id)}>Delete</Button>
          </div>
        ))}
    </div>
  );
};

export default ActorImages;
