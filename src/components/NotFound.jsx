import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 6, 
          borderRadius: 3, 
          textAlign: 'center',
          background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '6rem', 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 2 
          }}
        >
          404
        </Typography>
        
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ px: 3 }}
          >
            Go Back
          </Button>
          
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ px: 3 }}
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
