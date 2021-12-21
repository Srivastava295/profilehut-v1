import { Search } from '../app/features/profile-hut/pages/search/slice/SearchTypes';
import { Profile } from '../app/features/profile-hut/pages/profile/slice/ProfileTypes';
// [IMPORT NEW CONTAINER STATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/

export interface RootState {
  search: Search;
  profile: Profile;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
