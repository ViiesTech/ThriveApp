export const BASE_URL = 'https://apiforapp.link/ithriv/api/user/';
export const BASE_URL2 = 'https://apiforapp.link/ithriv/api/';
export const IMAGE_URL = 'https://apiforapp.link/ithriv/';

export const endpoints = {
  REGISTER: 'signUp',
  LOGIN: 'login',
  OTP: 'verifyOtp',
  SEND_EMAIL: 'sendOtp',
  RESET_PASSWORD: 'resetPassword',
  createBooking: 'user/createBooking',
  createNotes: 'user/createNote',
  deleteNote: 'user/deleteNote',
  createRatings: 'user/createReview',
  updateBookingStatus: 'user/updateBookingStatus',
  getServiceById: id => `admin/getServiceById?serviceId=${id}`,
  getBookingByReqType: type => `user/getBookingByReqType?reqType=${type}`,
  getTherapistBookings: ({ therapistId, bookingStatus, therapistStatus }) => {
    let url = `user/getBooking?therapistId=${therapistId}&bookingStatus=${bookingStatus}`;
    if (therapistStatus) url += `&therapistStatus=${therapistStatus}`;
    return url;
  },
  getUserBookings: ({ userId, bookingStatus, therapistStatus }) => {
    let url = `user/getBooking?userId=${userId}&bookingStatus=${bookingStatus}`;
    if (therapistStatus) {
      url += `&therapistStatus=${therapistStatus}`;
    }
    return url;
  },
  getTherapistById: ({ userId, therapistId }) =>
    `user/getProfile?userId=${userId}&_id=${therapistId}&type=Provider`,
  searchTherapist: ({ serviceId, addOn, gender }) => {
    // let url = `user/searchTherapist?longitude=73.9855&latitude=40.758&maxDistance=10000`;
    let url = `user/searchTherapist?maxDistance=10000`;
    if (serviceId) url += `&serviceId=${serviceId}`;
    if (addOn) url += `&addOn=${addOn}`;
    if (gender) url += `&gender=${gender}`;
    console.log('url', url);
    return url;
  },
  getTodayBooking: 'user/getTodayBooking',
  getTherapistNotes: 'user/getNotesByTherapist',
  getServices: 'admin/getAllService',
  getAddOns: 'admin/getAllAddOns',
  updateProfile: 'updateProfile',
};
