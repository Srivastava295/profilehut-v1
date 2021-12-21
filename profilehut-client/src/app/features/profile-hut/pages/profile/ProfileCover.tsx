import React from 'react';
import { alpha, Box, styled, Typography } from '@mui/material';
import ProfileAvatar from './ProfileAvatar';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useSelector } from 'react-redux';
import { profileSelector } from './slice/ProfileSelector';

const RootStyle = styled('div')(() => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    width: '100%',
    content: "''",
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    backgroundColor: alpha('#005249', 0.72),
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

const CoverImgStyle = styled('img')({
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const ProfileCover = () => {
  const profileData = useSelector(profileSelector);

  return (
    <>
      <RootStyle>
        <InfoStyle>
          <ProfileAvatar
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 80, md: 128 },
              height: { xs: 80, md: 128 },
            }}
          />
          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
              color: 'common.white',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h4">
              {profileData?.user?.firstname} {profileData?.user?.lastname}{' '}
              <CheckCircleRoundedIcon sx={{ color: 'skyblue' }} />
            </Typography>
            <Typography sx={{ opacity: 0.72 }}>
              {profileData?.user?.username} | {profileData?.user.occupation}
            </Typography>
          </Box>
        </InfoStyle>
        <CoverImgStyle
          alt="profile cover"
          src={'https://minimals.cc/static/mock-images/covers/cover_2.jpg'}
        />
      </RootStyle>
    </>
  );
};

export default ProfileCover;
