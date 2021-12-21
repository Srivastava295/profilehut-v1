import React, { forwardRef } from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

// @ts-ignore
const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </Box>
  );
});

export default Page;
