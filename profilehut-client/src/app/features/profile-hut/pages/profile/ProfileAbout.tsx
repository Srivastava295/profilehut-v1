import React from 'react';
import {
  Card,
  CardHeader,
  Link,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import { useSelector } from 'react-redux';
import { profileSelector } from './slice/ProfileSelector';

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const ProfileAbout = () => {
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
        <CardHeader title="About" />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="body2">{profileData?.user?.about}</Typography>

          <Stack direction="row">
            {/*// @ts-ignore*/}
            <IconStyle icon={pinFill} />
            <Typography variant="body2">
              <Link component="span" variant="subtitle2">
                {profileData?.user?.location}
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            {/*// @ts-ignore*/}
            <IconStyle icon={emailFill} />
            <Typography variant="body2">example@gmail.com</Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default ProfileAbout;
