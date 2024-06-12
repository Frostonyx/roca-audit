import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

function CardImage(props: { name: string; number: string }) {
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    fetch(`/api/getCardImage?name=${props.name}&number=${props.number}`)
      .then((response) => response.json())
      .then((data) => setImageUrl(data.cardImage))
      .catch((error) => setImageUrl("assets/cardBack.jpg"));
    console.log("Image URL:" + imageUrl);
  }, [props.name]);

  return (
    <Box
      component="img"
      sx={{
width: '100%'
      }}
      alt="Card Image"
      src={imageUrl}
    />
  );
}

export default CardImage;
