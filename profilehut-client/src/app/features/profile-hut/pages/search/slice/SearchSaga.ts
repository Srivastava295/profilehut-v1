import { call, put, takeLatest } from 'redux-saga/effects';
import { searchSliceActions } from './SearchSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { axiosApi } from '../../../../../utils/axios-utils/axios-api';
import { apiConfig } from '../../../../../utils/api';

const searchUserApi = (
  action: PayloadAction<{ keyword: string; offset: number; pageSize: number }>,
) => {
  const { keyword, offset, pageSize } = action.payload;
  const json = {
    keyword: keyword,
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    pagingOptions: {
      offset: offset,
      pageSize: pageSize,
    },
  };
  return axiosApi.post(`${apiConfig.baseURL}/user/search`, json);
};

function* searchUserFlow(
  action: PayloadAction<{ keyword: string; offset: number; pageSize: number }>,
) {
  try {
    const response = yield call(searchUserApi, action);
    if (response) {
      yield put(
        searchSliceActions.searchSuccess({
          users: response.data.data.appUserList,
          userCount: response.data.data.appUserCount,
        }),
      );
    }
  } catch (error) {
    yield put(
      searchSliceActions.searchFailure({
        data: error.response.data,
      }),
    );
  }
}

function* searchWatcher() {
  yield takeLatest(searchSliceActions.searchUser.type, searchUserFlow);
}

export default searchWatcher;
