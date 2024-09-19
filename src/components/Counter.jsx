import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export const Counter = ({ stock, quantity, onQuantityChange }) => {
  const [count, setCount] = useState(quantity);

  const handleIncrement = () => {
    if (count < stock) {
      const newCount = count + 1;
      setCount(newCount);
      onQuantityChange(newCount);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onQuantityChange(newCount);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "25px",
        width: "100px",
        border: "1px solid grey",
        borderRadius: "4px",
        overflow: "hidden",
        margin: "5px",
      }}
    >
      <Button
        onClick={handleDecrement}
        sx={{
          minWidth: "25px",
          height: "100%",
          padding: 0,
          fontSize: "12px",
          borderRadius: 0,
        }}
      >
        -
      </Button>
      <Typography
        sx={{
          flexGrow: 1,
          textAlign: "center",
          fontSize: "12px",
          lineHeight: "25px",
        }}
      >
        {count}
      </Typography>
      <Button
        onClick={handleIncrement}
        sx={{
          minWidth: "25px",
          height: "100%",
          padding: 0,
          fontSize: "12px",
          borderRadius: 0,
        }}
      >
        +
      </Button>
    </Box>
  )
}
