import { call, put, takeLatest } from 'redux-saga/effects';
import { profileSliceActions } from './ProfileSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { axiosApi } from '../../../../../utils/axios-utils/axios-api';
import { apiConfig } from '../../../../../utils/api';

const getProfileApi = (action: PayloadAction<{ userId: number }>) => {
  const { userId } = action.payload;
  return axiosApi.get(`${apiConfig.baseURL}/user/${userId}`);
};

function* getProfileFlow(action: PayloadAction<{ userId: number }>) {
  try {
    const response = yield call(getProfileApi, action);
    if (response) {
      yield put(profileSliceActions.getProfileSuccess(response.data.data.user));
    }
  } catch (error) {
    yield put(
      profileSliceActions.getProfileFailure({
        data: error.response.data,
      }),
    );
  }
}

function* profileWatcher() {
  yield takeLatest(profileSliceActions.getProfile.type, getProfileFlow);
}

export default profileWatcher;
