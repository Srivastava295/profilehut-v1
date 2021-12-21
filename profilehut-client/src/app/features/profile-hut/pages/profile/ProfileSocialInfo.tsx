import { Card, CardHeader, Link, Stack, styled } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import { useSelector } from 'react-redux';
import { profileSelector } from './slice/ProfileSelector';

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const ProfileSocialInfo = () => {
  const profileData = useSelector(profileSelector);

  const SOCIALS = [
    {
      name: 'Linkedin',
      // @ts-ignore
      icon: <IconStyle icon={linkedinFill} color="#006097" />,
      href: 'https://www.linkedin.com/in/juan-jose-gonzalez-gomez-b9a8a1177/',
    },
    {
      name: 'Twitter',
      // @ts-ignore
      icon: <IconStyle icon={twitterFill} color="#1C9CEA" />,
      href: 'https://twitter.com/JuanJoseGonzalez',
    },
    {
      name: 'Website',
      // @ts-ignore
      icon: <IconStyle icon={twitterFill} color="#1C9CEA" />,
      href: profileData?.user?.website,
    },
  ];

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
        <CardHeader title="Social" />
        <Stack spacing={2} sx={{ p: 3 }}>
          {SOCIALS.map(link => (
            <Stack key={link.name} direction="row" alignItems="center">
              {link.icon}
              <Link component="span" variant="body2" noWrap>
                {link.href}
              </Link>
            </Stack>
          ))}
        </Stack>
      </Card>
    </>
  );
};

export default ProfileSocialInfo;
