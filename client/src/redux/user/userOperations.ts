import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';
import { authInitialStateType } from './userSlice';
import { apiKey } from '../globals/globalsOperations';
import { apiLink } from '../globals/globalsOperations';

axios.defaults.baseURL = apiLink;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const setApiKeyHeader = (apiKey: string | undefined) => {
  axios.defaults.headers.common['x-api-key'] = apiKey;
};

type credentialsRegisterType = {
  username: string;
  email: string;
  password: string;
};
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: credentialsRegisterType, thunkAPI) => {
    try {
      setApiKeyHeader(apiKey);
      const response = await axios.post('/users/signup', credentials);
      setAuthHeader(response.data.ResponseBody.user.token);

      Notiflix.Notify.success(response.data.ResponseBody.message);
      return response.data.ResponseBody.user;
    } catch (error: any) {
      Notiflix.Notify.failure(error.response.data.ResponseBody.message);
      return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
    }
  }
);

type credentialsLoginType = {
  email: string;
  password: string;
};
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials: credentialsLoginType, thunkAPI) => {
    try {
      setApiKeyHeader(apiKey);
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.ResponseBody.token);

      Notiflix.Notify.success(response.data.ResponseBody.message);
      return response.data.ResponseBody;
    } catch (error: any) {
      Notiflix.Notify.failure(error.response.data.ResponseBody.message);
      return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as AuthStateType;
    const token = state?.user?.token || '';

    if (!token) return thunkAPI.rejectWithValue('Valid token is not provided');
    setAuthHeader(token);
    setApiKeyHeader(apiKey);
    await axios.post('/users/logout');
    removeAuthHeader();
  } catch (error: any) {
    Notiflix.Notify.failure(error.response.data.ResponseBody.message);
    return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
  }
});

export type AuthStateType = {
  user: authInitialStateType;
};

export const refreshUser = createAsyncThunk<
  ReturnType<typeof axios.get>,
  undefined,
  { state: AuthStateType }
>('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AuthStateType;
  const token = state?.user?.token || '';

  if (!token)
    return thunkAPI.rejectWithValue('Login or register to get access');
  setApiKeyHeader(apiKey);
  setAuthHeader(token);
  try {
    const res = await axios.get('/users/current');
    return res.data.ResponseBody;
  } catch (e: any) {
    Notiflix.Notify.failure(e.response.data.ResponseBody.message);
    return thunkAPI.rejectWithValue(e.response.data.ResponseBody.message);
  }
});


export const getUserProgress = createAsyncThunk(
  'user/getUserProgress',
  async (_, thunkAPI) => {
    try {
      setApiKeyHeader(apiKey);
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.user?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      const response = await axios.get('/courses-progress');

      return response.data.ResponseBody.progress;
    } catch (error: any) {
      Notiflix.Notify.failure(error.response.data.ResponseBody.message);
      return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
    }
  }
);