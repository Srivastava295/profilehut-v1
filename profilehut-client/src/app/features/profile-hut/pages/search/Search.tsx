// noinspection RequiredAttributes

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Dialog,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Slide,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { searchSelector } from './slice/SearchSelector';
import { useSearchSlice } from './slice/SearchSlice';
import { ListItemAvatar } from '@mui/material';
import { Skeleton } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useProfileSlice } from '../profile/slice/ProfileSlice';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgb(102 120 141 / 15%)',
  '&:hover': {
    backgroundColor: 'rgb(102 120 141 / 15%)',
  },
  boxShadow:
    'rgb(0 0 0 / 24%) 0px 0px 2px 0px, rgb(0 0 0 / 24%) 0px 16px 32px -4px',
  marginRight: theme.spacing(2),
  marginTop: 5,
  marginLeft: 0,
  marginBottom: 5,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

const DialogContainer = styled('div')(() => ({
  backgroundColor: 'rgb(33, 43, 54) !important',
}));

const useStyles = makeStyles(() => ({
  '@global': {
    '.MuiDialog-paper': {
      backgroundColor: 'rgb(33, 43, 54) !important',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = () => {
  useStyles();

  const dispatch = useDispatch();
  const searchData = useSelector(searchSelector);
  const { searchSliceActions } = useSearchSlice();
  const { profileSliceActions } = useProfileSlice();

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.length > 0) {
        dispatch(
          searchSliceActions.searchUser({
            keyword: searchText,
            offset: 0,
            pageSize: 10,
          }),
        );
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(searchSliceActions.searchReset());
  };

  const handleSearchInputChange = event => {
    setSearchText(event.target.value);
    if (event.target.value.length === 0) {
      dispatch(searchSliceActions.searchReset());
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // @ts-ignore
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: 'relative', backgroundColor: 'rgb(33, 43, 54)' }}
        >
          <Toolbar>
            <Typography
              sx={{ ml: 10, flex: 1, fontFamily: 'cursive' }}
              variant="h6"
              component="div"
            >
              Profile Hut
            </Typography>
            <Stack direction="row">
              <SearchWrapper>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onFocus={event =>
                    (event.target.placeholder = 'Search users...')
                  }
                  onBlur={event => (event.target.placeholder = 'Search...')}
                  onChange={handleSearchInputChange}
                />
              </SearchWrapper>
            </Stack>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ flex: '1 1 100px' }}
              disableRipple
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContainer>
          <List sx={{ backgroundColor: 'rgb(33, 43, 54)' }}>
            {searchText.length > 0 && searchData?.userResults?.userCount === 0 && (
              <>
                <Stack direction="column" alignItems="center">
                  <img
                    src={'/static/assets/images/no_results.png'}
                    alt="no results"
                    style={{ marginTop: 40, height: '500px' }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: 'white' }}
                  >
                    No results found for{' '}
                    <span style={{ color: 'grey' }}>'{searchText}'</span>.
                  </Typography>
                </Stack>
              </>
            )}
            {searchData?.loading ? (
              <>
                {[...Array(10)].map((_, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Skeleton
                        variant="circular"
                        animation="wave"
                        width={40}
                        height={40}
                        sx={{ ml: '10%' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Skeleton
                          variant="text"
                          animation="wave"
                          sx={{ width: '95%' }}
                        />
                      }
                      secondary={
                        <Skeleton
                          variant="text"
                          animation="wave"
                          sx={{ width: '80%' }}
                        />
                      }
                    />
                  </ListItem>
                ))}
              </>
            ) : (
              <>
                {searchData?.userResults?.users?.length !== 0 &&
                  searchData?.userResults?.users?.map((user, index) => (
                    <ListItem
                      key={index}
                      button
                      sx={{ color: 'white' }}
                      onClick={() => {
                        dispatch(
                          profileSliceActions.getProfile({
                            userId: user.userId,
                          }),
                        );
                        handleClose();
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={user.profilePicUrl} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <span>
                              {user.firstname} {user.lastname}
                            </span>{' '}
                            {user.isVerified && (
                              <CheckCircleRoundedIcon
                                fontSize={'small'}
                                sx={{ color: 'skyblue' }}
                              />
                            )}
                          </>
                        }
                        secondary={
                          <span style={{ color: 'grey' }}>{user.username}</span>
                        }
                      />
                    </ListItem>
                  ))}
              </>
            )}
          </List>
          {searchData?.userResults?.users?.length !== 0 && (
            <>
              <Stack direction="row">
                <Typography sx={{ ml: 4, color: 'white' }}>
                  Showing {searchData?.userResults?.users?.length} of{' '}
                  {searchData?.userResults?.userCount}
                </Typography>
              </Stack>
            </>
          )}
        </DialogContainer>
      </Dialog>
      <Stack direction="row" alignItems="center">
        <Typography
          sx={{ color: 'white', fontFamily: 'cursive' }}
          variant="h6"
          component="div"
        >
          Profile Hut
        </Typography>
        <SearchWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onClick={handleClickOpen}
            onChange={event => {
              handleClickOpen();
              event.target.value = '';
            }}
          />
        </SearchWrapper>
      </Stack>
    </>
  );
};

export default Search;
