// src/services/discountService.ts
import axios from 'axios';
import { Discount } from '../types';

const API_URL = 'https://api.discoun3ree.com/api/discounts';

export const fetchDiscounts = async (): Promise<Discount[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching discounts:', error);
    return [];
  }
};
