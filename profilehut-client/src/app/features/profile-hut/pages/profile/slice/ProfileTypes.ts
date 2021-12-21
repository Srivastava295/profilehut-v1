export interface Profile {
  user: UserProfile;
  userId: number;
  loading: boolean;
  success: boolean;
  message: string;
  status: number;
}

export interface UserProfile {
  userId: number | null;
  username: string;
  firstname: string;
  lastname: string;
  occupation: string;
  gender: string;
  about: string;
  bio: string;
  location: string;
  phone: string;
  website: string;
  imgUrl: string;
}
