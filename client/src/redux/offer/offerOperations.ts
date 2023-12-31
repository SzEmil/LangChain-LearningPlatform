import axios from 'axios';
import { apiKey } from '../globals/globalsOperations';
import { apiLink } from '../globals/globalsOperations';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

axios.defaults.baseURL = apiLink;

// const setAuthHeader = (token: string) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const removeAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };

const setApiKeyHeader = (apiKey: string | undefined) => {
  axios.defaults.headers.common['x-api-key'] = apiKey;
};

type offerObjectDataType = {
  language: string;
};

export const getCurrentOffer = createAsyncThunk(
  'offer/getCurrentOffer',
  async (offerObjectData: offerObjectDataType, thunkAPI) => {
    try {
      setApiKeyHeader(apiKey);
      const response = await axios.post('/offer', offerObjectData);

      return response.data.ResponseBody.offer;
    } catch (error: any) {
      Notiflix.Notify.failure(error.response.data.ResponseBody.message);
      return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
    }
  }
);
