import { Profile, UserProfile } from './ProfileTypes';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../../../utils/redux-injectors';
import profileWatcher from './ProfileSaga';

const name = 'profile';

export const initialState: Profile = {
  user: {
    userId: null,
    username: '',
    firstname: '',
    lastname: '',
    occupation: '',
    gender: '',
    about: '',
    bio: '',
    location: '',
    phone: '',
    website: '',
    imgUrl: '',
  },
  userId: 0,
  loading: false,
  message: '',
  status: 0,
  success: false,
};

const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
    getProfile: (state, action: PayloadAction<{ userId: number }>) => {
      state.loading = true;
      state.userId = action.payload.userId;
    },
    getProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    getProfileFailure: (state, action: PayloadAction<{ data: string }>) => {
      state.loading = false;
      state.message = action.payload.data;
      state.success = false;
    },
    resetProfile: () => {
      return initialState;
    },
  },
});

export const { actions: profileSliceActions, reducer } = profileSlice;

export const useProfileSlice = () => {
  useInjectReducer({
    key: profileSlice.name,
    reducer: profileSlice.reducer,
  });
  useInjectSaga({ key: profileSlice.name, saga: profileWatcher });
  return { profileSliceActions: profileSlice.actions };
};
