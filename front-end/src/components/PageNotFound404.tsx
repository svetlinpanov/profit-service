import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const PageNotFound404: React.FC = () => {
  return (
    <Box sx={{ height: '100%', display: 'grid', placeItems: 'center', placeContent: 'center' }}>
      <Typography component="h1" variant="h1">
        404
      </Typography>
      <Typography component="h2" variant="h6">
        Page not found!
      </Typography>
      <Link to="/dash" component={RouterLink} sx={{ mt: 2 }}>
        Dashboard home
      </Link>
    </Box>
  );
};
