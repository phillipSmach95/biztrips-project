import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Spinner({ message = "Loading..." }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <CircularProgress 
        size={50} 
        thickness={4}
        sx={{ 
          color: 'primary.main',
          mb: 2 
        }}
      />
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ textAlign: 'center' }}
      >
        {message}
      </Typography>
    </Box>
  );
}
