import axios from 'axios';
import { baseUrl } from './../constants/env.constants';

const API_BASE_URL = `${baseUrl}/subscribe`;

export const subscribeEmail = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/subscribe/`, formData);
  return response.data;
};

export const verifySubscription = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/subscribe/verify/${token}/`);
  return response.data;
};