import {
  createSlice,
  SerializedError,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

type AppError = Error | SerializedError;

export type Repo = {
  id: number;
  name: string;
  fork: boolean;
};

export type RepoState = {
  isLoading: boolean;
  repos: Repo[];
  error?: AppError;
};

export const fetchRepos = createAsyncThunk<Repo[]>(
  "repos/fetchRepos",
  async () => {
    const response = await fetch("https://api.github.com/repositories");
    return await response.json();
  }
);

const repoSlice = createSlice({
  name: "repos",
  initialState: { isLoading: false, repos: [], error: undefined } as RepoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchRepos.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        repos: payload,
      }))
      .addCase(fetchRepos.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
      }));
  },
});

export const { reducer } = repoSlice;
