import React, { forwardRef } from 'react';
import { Avatar } from '@mui/material';

// @ts-ignore
const MaterialAvatar = forwardRef(({ sx, children, ...other }, ref) => {
  return (
    // @ts-ignore
    <Avatar ref={ref} sx={sx} {...other}>
      {children}
    </Avatar>
  );
});

export default MaterialAvatar;
