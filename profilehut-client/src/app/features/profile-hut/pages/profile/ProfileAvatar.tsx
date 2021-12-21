import React from 'react';
import MaterialAvatar from '../../../../components/MaterialAvatar';
import { useSelector } from 'react-redux';
import { profileSelector } from './slice/ProfileSelector';

const ProfileAvatar = ({ ...other }) => {
  const profileData = useSelector(profileSelector);

  return (
    <>
      {/*// @ts-ignore*/}
      <MaterialAvatar src={profileData?.user.imgUrl} alt="avatar" {...other} />
    </>
  );
};

export default ProfileAvatar;
