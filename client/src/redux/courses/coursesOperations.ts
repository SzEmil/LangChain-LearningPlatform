import axios from 'axios';
import { apiKey } from '../globals/globalsOperations';
import { apiLink } from '../globals/globalsOperations';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { AuthStateType } from '../user/userOperations';

axios.defaults.baseURL = apiLink;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const setApiKeyHeader = (apiKey: string | undefined) => {
  axios.defaults.headers.common['x-api-key'] = apiKey;
};

export const getUserCourses = createAsyncThunk(
  'courses/getUserCourses',
  async (_, thunkAPI) => {
    try {
      setApiKeyHeader(apiKey);
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.user?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      const response = await axios.get('/courses');

      return response.data.ResponseBody.courses;
    } catch (error: any) {
      Notiflix.Notify.failure(error.response.data.ResponseBody.message);
      return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
    }
  }
);

export const getUserCourseById = createAsyncThunk(
  'courses/getUserCourseById',
  async (courseId: string | undefined, thunkAPI) => {
    try {
      setApiKeyHeader(apiKey);
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.user?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      const response = await axios.get(`/courses/${courseId}`);

      return response.data.ResponseBody.course;
    } catch (error: any) {
      Notiflix.Notify.failure(error.response.data.ResponseBody.message);
      return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
    }
  }
);
