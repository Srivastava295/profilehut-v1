import { Search, SearchResultsResponse } from './SearchTypes';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import searchWatcher from './SearchSaga';

const name = 'search';

export const initialState: Search = {
  keyword: '',
  loading: false,
  pageNum: 0,
  pageSize: 10,
  message: '',
  status: 0,
  success: false,
  userResults: {
    users: [],
    userCount: -1,
  },
};

const searchSlice = createSlice({
  name,
  initialState,
  reducers: {
    searchUser: (
      state,
      action: PayloadAction<{
        keyword: string;
        offset: number;
        pageSize: number;
      }>,
    ) => {
      state.keyword = action.payload.keyword;
      state.loading = true;
      state.pageNum = action.payload.offset;
      state.pageSize = action.payload.pageSize;
    },
    searchSuccess: (state, action: PayloadAction<SearchResultsResponse>) => {
      state.loading = false;
      state.userResults.users = action.payload.users;
      state.userResults.userCount = action.payload.userCount;
    },
    searchFailure: (state, action: PayloadAction<{ data: string }>) => {
      state.loading = false;
      state.message = action.payload.data;
    },
    searchReset: () => {
      return initialState;
    },
  },
});

export const { actions: searchSliceActions, reducer } = searchSlice;

export const useSearchSlice = () => {
  useInjectReducer({
    key: searchSlice.name,
    reducer: searchSlice.reducer,
  });
  useInjectSaga({ key: searchSlice.name, saga: searchWatcher });
  return { searchSliceActions: searchSlice.actions };
};
