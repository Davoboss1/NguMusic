import { user } from "@/types";

export interface userSliceType{
    user: user | null;
    setUser: (user: user) => void
  }

export interface userTokensSliceType {
  access: string;
  refresh: string;
  setAccessToken: (val: string) => void;
  setRefreshToken: (val: string) => void;
}