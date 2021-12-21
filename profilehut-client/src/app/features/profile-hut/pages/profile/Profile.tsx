import React from 'react';
import {
  Box,
  Card,
  Container,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import ProfileCover from './ProfileCover';
import ProfileInfoWrapper from './ProfileInfoWrapper';
import { useSelector } from 'react-redux';
import { profileSelector } from './slice/ProfileSelector';

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: 'rgb(33, 43, 54)',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

const Profile = () => {
  const profileData = useSelector(profileSelector);
  return (
    <>
      <Box>
        {profileData?.userId === 0 ? (
          <>
            <Stack direction="column" alignItems="center">
              <img
                src={'/static/assets/images/search.png'}
                alt="Search"
                style={{ marginTop: 40, height: '500px' }}
              />
              <Typography
                component="div"
                variant="h5"
                sx={{ color: '#a7a4a4' }}
              >
                It's empty here. Start searching...!
              </Typography>
            </Stack>
          </>
        ) : (
          <>
            <Container maxWidth={'lg'}>
              <Card
                sx={{
                  mb: 3,
                  height: 280,
                  position: 'relative',
                  backgroundColor: 'rgb(33, 43, 54)',
                }}
              >
                <ProfileCover />
                <TabsWrapperStyle>
                  <Tabs value={'Profile'}>
                    <Tab label="Profile" value={'Profile'} />
                  </Tabs>
                </TabsWrapperStyle>
              </Card>
              <Box>
                <ProfileInfoWrapper />
              </Box>
            </Container>
          </>
        )}
      </Box>
    </>
  );
};

export default Profile;
