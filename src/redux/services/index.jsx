import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL, endpoints } from '../constant';

export const Apis = createApi({
  reducerPath: 'authApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().persistedData.token;
      console.log('state ===>', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: endpoints.REGISTER,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOTP: builder.mutation({
      query: data => ({
        url: endpoints.OTP,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: data => ({
        url: endpoints.LOGIN,
        method: 'POST',
        body: data,
      }),
    }),
    // getProfile: builder.query({
    //   query: () => ({
    //     url: endpoints.GET_PROFILE,
    //     method: 'GET',
    //   }),
    // }),


  
  }),
});

export const {
  useRegisterMutation,
  useVerifyOTPMutation,
  useLoginMutation,
} = Apis;
