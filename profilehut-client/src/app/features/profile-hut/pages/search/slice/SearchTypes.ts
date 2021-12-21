export interface Search {
  keyword: string;
  loading: boolean;
  pageNum: number;
  pageSize: number;
  message: string | null;
  status: number;
  success: boolean;
  userResults: SearchResultsResponse;
}

export interface User {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  isVerified: boolean;
  profilePicUrl: string;
}

export interface SearchResultsResponse {
  users: User[];
  userCount: number;
}
