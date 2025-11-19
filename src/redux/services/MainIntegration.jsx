// src/services/mainApis.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL2, endpoints } from '../constant';

export const MainApis = createApi({
  reducerPath: 'mainApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL2,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().persistedData.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getServices: builder.query({
      query: () => ({
        url: endpoints.getServices,
        method: 'GET',
      }),
    }),
    getServiceById: builder.query({
      query: id => ({
        url: endpoints.getServiceById(id),
        method: 'GET',
      }),
    }),
    getTherapistById: builder.query({
      query: ({ userId, therapistId }) => ({
        url: endpoints.getTherapistById({ userId, therapistId }),
        method: 'GET',
      }),
    }),
    getBookingByReqType: builder.query({
      query: type => ({
        url: endpoints.getBookingByReqType(type),
        method: 'GET',
      }),
    }),
    getTherapistBookings: builder.query({
      query: ({ therapistId, bookingStatus, therapistStatus }) => ({
        url: endpoints.getTherapistBookings({
          therapistId,
          bookingStatus,
          therapistStatus,
        }),
        method: 'GET',
      }),
    }),
    getUserBookings: builder.query({
      query: ({ userId, bookingStatus, therapistStatus }) => ({
        url: endpoints.getUserBookings({
          userId,
          bookingStatus,
          therapistStatus,
        }),
        method: 'GET',
      }),
    }),
    searchTherapist: builder.query({
      query: ({ serviceId, addOn, gender }) => ({
        url: endpoints.searchTherapist({ serviceId, addOn, gender }),
        method: 'GET',
      }),
    }),
    getAddOns: builder.query({
      query: () => ({
        url: endpoints.getAddOns,
        method: 'GET',
      }),
    }),
    getTodaysBookings: builder.query({
      query: () => ({
        url: endpoints.getTodayBooking,
        method: 'GET',
      }),
    }),
    getTherapistNotes: builder.query({
      query: () => ({
        url: endpoints.getTherapistNotes,
        method: 'GET',
      }),
    }),
    createBookingRequest: builder.mutation({
      query: data => ({
        url: endpoints.createBooking,
        method: 'POST',
        body: data,
      }),
    }),
    createInternalNotes: builder.mutation({
      query: data => ({
        url: endpoints.createNotes,
        method: 'POST',
        body: data,
      }),
    }),
    deleteNote: builder.mutation({
      query: data => ({
        url: endpoints.deleteNote,
        method: 'POST',
        body: data,
      }),
    }),
    createRatings: builder.mutation({
      query: data => ({
        url: endpoints.createRatings,
        method: 'POST',
        body: data,
      }),
    }),
    updateBookingStatus: builder.mutation({
      query: data => ({
        url: endpoints.updateBookingStatus,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetAddOnsQuery,
  useLazyGetServiceByIdQuery,
  useLazySearchTherapistQuery,
  useLazyGetTherapistByIdQuery,
  useCreateBookingRequestMutation,
  useLazyGetBookingByReqTypeQuery,
  useUpdateBookingStatusMutation,
  useCreateRatingsMutation,
  useLazyGetTherapistBookingsQuery,
  useLazyGetUserBookingsQuery,
  useLazyGetTodaysBookingsQuery,
  useCreateInternalNotesMutation,
  useLazyGetTherapistNotesQuery,
  useDeleteNoteMutation,
} = MainApis;
