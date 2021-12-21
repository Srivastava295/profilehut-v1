import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Profile from '../../features/profile-hut/pages/profile/Profile';
import Search from '../../features/profile-hut/pages/search/Search';
import { styled } from '@mui/material';

const RootStyle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'rgb(22, 28, 36)',
});

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="User search engine" />
      </Helmet>
      <RootStyle>
        <Search />
        <Profile />
      </RootStyle>
    </>
  );
}
