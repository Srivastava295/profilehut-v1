import React from 'react';
import { Grid, Stack } from '@mui/material';
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';
import ProfileBio from './ProfileBio';

const ProfileInfoWrapper = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <ProfileAbout />
            <ProfileSocialInfo />
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <ProfileBio />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileInfoWrapper;
