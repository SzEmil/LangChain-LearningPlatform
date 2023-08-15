import axios from 'axios';
import { apiKey } from '../globals/globalsOperations';
import { apiLink } from '../globals/globalsOperations';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { paymentDataType } from '../../Components/PayUForm/PayUForm';
import { AuthStateType } from '../user/userOperations';

axios.defaults.baseURL = apiLink;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const setApiKeyHeader = (apiKey: string | undefined) => {
  axios.defaults.headers.common['x-api-key'] = apiKey;
};

export const createNewPayment = createAsyncThunk(
  'payment/createNewPayment',
  async (paymentData: paymentDataType, thunkAPI) => {
    try {
      setApiKeyHeader(apiKey);
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.user?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      const response = await axios.post('/payment', paymentData);

      return response.data.ResponseBody.payURedirect;
    } catch (error: any) {
      Notiflix.Notify.failure(error.response.data.ResponseBody.message);
      return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
    }
  }
);

export const getPaymentData = createAsyncThunk(
  'payment/getPaymentData',
  async (paymentId: string | string[] | undefined, thunkAPI) => {
    try {
      setApiKeyHeader(apiKey);
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.user?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      const response = await axios.get(`payment/${paymentId}`);

      return response.data.ResponseBody.payment;
    } catch (error: any) {
      Notiflix.Notify.failure(error.response.data.ResponseBody.message);
      return thunkAPI.rejectWithValue(error.response.data.ResponseBody.message);
    }
  }
);
