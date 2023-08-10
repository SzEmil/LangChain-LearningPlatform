import axios from "axios";
import { apiKey } from "../globals/globalsOperations";
import { apiLink } from "../globals/globalsOperations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";

axios.defaults.baseURL = apiLink;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const setApiKeyHeader = (apiKey: string | undefined) => {
  console.log(apiKey);
  axios.defaults.headers.common['x-api-key'] = apiKey;
};

export const getCurrentOffer = createAsyncThunk(
    'offer/getCurrentOffer',
    async (_, thunkAPI) => {
      try {
        setApiKeyHeader(apiKey);
        const response = await axios.get('/offer');
  
        return response.data.ResponseBody.offer;
      } catch (error: any) {
        Notiflix.Notify.failure(error.response.data.ResponseBody.message);
        return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
      }
    }
  );