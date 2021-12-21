import React from 'react';
import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { profileSelector } from './slice/ProfileSelector';

const ProfileBio = () => {
  const profileData = useSelector(profileSelector);

  return (
    <>
      <Card
        sx={{
          backgroundColor: 'rgb(33, 43, 54)',
          color: 'white',
          boxShadow:
            'rgb(0 0 0 / 24%) 0px 0px 2px 0px, rgb(0 0 0 / 24%) 0px 16px 32px -4px',
        }}
      >
        <CardHeader title="Bio" />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="body2">{profileData?.user?.bio}</Typography>
        </Stack>
      </Card>
    </>
  );
};

export default ProfileBio;
