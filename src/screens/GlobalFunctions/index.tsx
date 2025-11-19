import axios from "axios";
import { BASE_URL } from "../../redux/constant";

const Register = async (fullName: string, email: string, password: string, phoneNumber: Number, type: string) => {
  let data = JSON.stringify({
    "fullName": fullName,
    "email": email,
    "password": password,
    "phoneNumber": phoneNumber,
    "type": type
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}user/signUp`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    console.log('resppp', response?.data);
    return response?.data;
  } catch (error) {
    console.log('errrr', error);
    throw error;
  }
}
const LoginUser = async (email: string, password: string, dispatch: any) => {
  let data = JSON.stringify({
    "email": email,
    "password": password
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}user/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  // dispatch(UserLogin(config));
}
const ForgotPasswordApi = async (email: string) => {
  let data = JSON.stringify({
    "email": email
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}user/sendOtp`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    console.log('forgot pass response', response.data);
    return response.data;
  } catch (error) {
    console.log('forgot pass errr', error);
    throw error;
  }
}
const VerifySignupOtp = async (otp: number, signUpToken: string, email: string) => {
  // ✅ Build the request body properly
  const payload: any = {
    Otp: otp,
  };

  if (email) {
    payload.email = email;
  }

  if (signUpToken) {
    payload.addSignUpToken = signUpToken;
  }

  const data = JSON.stringify(payload);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}user/verifyOtp`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios.request(config);
    console.log('otp response', response.data);
    return response.data;
  } catch (error) {
    console.log('errr', error);
    throw error;
  }
};
const ResetPasswordApi = async (email: string, password: number) => {
  let data = JSON.stringify({
    "email": email,
    "newPassword": password,
    "type": "Forget"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}user/resetPassword`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    console.log('reset pass response', response.data);
    return response.data;
  } catch (error) {
    console.log('reset pass errr', error);
    throw error;
  }
}
const UpdateUserProfile = async (
  id: string,
  fullName: string,
  dob: string,
  address: string,
  phoneNumber: number,
  latitude?: number,
  longitude?: number,
  locationName?: string,
  image?: any,
  dispatch: any,
  // navigation: any,
  // stripeCustomerId: string,
) => {
  let data = new FormData();
  data.append('id', id);
  data.append('type', 'Client');
  if (fullName) {
    data.append('fullName', fullName);
  }
  if (dob) {
    data.append('dob', dob);
  }
  if (address) {
    data.append('address', address);
  }
  if (image) {
    data.append('image', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
  }
  if (longitude) {
    data.append('longitude', longitude);
  }
  if (latitude) {
    data.append('latitude', latitude);
  }
  if (locationName) {
    data.append('locationName', locationName);
  }
  if (phoneNumber) {
    data.append('phoneNumber', Number(phoneNumber));
  }
  console.log('data', data);
  // if (stripeCustomerId) {
  //   data.append('stripeCustomerId', stripeCustomerId);
  // }
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}user/updateProfile`,
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('Post Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error creating post:',
      error?.response?.data?.message,
    );
    throw error;
  }
};
const UpdateProviderProfile = async (
  id: string,
  fullName: string,
  dob: string,
  address: string,
  phoneNumber: number,
  latitude?: number,
  longitude?: number,
  locationName?: string,
  image?: any,
  city?: any,
  serviceId?: any,
  addOn?: any,
  workingDays?: any,
  certificate?: any,
  about?: any,
  travel?: any,
  gender?: any,
  dispatch: any,
  // navigation: any,
  // stripeCustomerId: string,
) => {
  let data = new FormData();
  data.append('id', id);
  data.append('type', 'Client');
  if (fullName) {
    data.append('fullName', fullName);
  }
  if (dob) {
    data.append('dob', dob);
  }
  if (city) {
    data.append('city', city);
  }
  if (address) {
    data.append('address', address);
  }
  if (image) {
    data.append('image', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
  }
  if (longitude) {
    data.append('longitude', longitude);
  }
  if (latitude) {
    data.append('latitude', latitude);
  }
  if (locationName) {
    data.append('locationName', locationName);
  }
  if (phoneNumber) {
    data.append('phoneNumber', Number(phoneNumber));
  }
  if (serviceId) {
    data.append('serviceId', serviceId);
  }
  if (addOn) {
    data.append('addOn', addOn);
  }
  if (workingDays) {
    data.append('workingDays', workingDays);
  }
  if (about) {
    data.append('about', about);
  }
  if (travel) {
    data.append('travel', travel);
  }
  if (gender) {
    data.append('gender', gender);
  }
  certificate.forEach((file, index) => {
    data.append('certificate', {
      uri: file.uri,
      name: file.name || `certificate_${index}.pdf`,
      type: file.type || 'application/pdf',
    });
  });
  console.log('data', data);
  // if (stripeCustomerId) {
  //   data.append('stripeCustomerId', stripeCustomerId);
  // }
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}user/updateProfile`,
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('Post Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error creating post:',
      error?.response?.data?.message,
    );
    throw error;
  }
};


export { Register, LoginUser, VerifySignupOtp, ForgotPasswordApi, ResetPasswordApi, UpdateUserProfile, UpdateProviderProfile }