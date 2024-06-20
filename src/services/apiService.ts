import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://api.discoun3ree.com/api';

const getToken = () => localStorage.getItem('access_token');

const getHeaders = (includeAuth: boolean = true) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('Access token not found in localStorage');
      throw new Error('Access token not found');
    }
  }

  return headers;
};

interface ReviewData {
  id?: number;
  body?: string;
  reviewable_type?: 'shop' | 'discount';
  reviewable_id?: number;
}

export const manageReview = async (method: 'post' | 'put' | 'delete', data: ReviewData) => {
  const url = method === 'post' ? `${BASE_URL}/reviews` : `${BASE_URL}/reviews/${data.id}`;
  
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error ${method}ing review:`, error);
    toast.error(`An error occurred while ${method}ing the review.`);
    throw error; 
  }
};

export const getReviewsByReviewable = async (reviewableType: 'shop' | 'discount', reviewableId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/${reviewableType}/${reviewableId}`, {
      headers: getHeaders(false), 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    toast.error('An error occurred while fetching reviews.');
    throw error; 
  }
};

export const followShop = async (shopId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/follow`, { shop_id: shopId }, {
      headers: getHeaders(),
    });
    toast.success('Followed shop successfully!');
    return response.data;
  } catch (error) {
    console.error('Error following shop:', error);
    toast.error('An error occurred while following the shop.');
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

export const unfollowShop = async (shopId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/unfollow`, { shop_id: shopId }, {
      headers: getHeaders(),
    });
    toast.success('Unfollowed shop successfully!');
    return response.data;
  } catch (error) {
    console.error('Error unfollowing shop:', error);
    toast.error('An error occurred while unfollowing the shop.');
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

export const getShopFollowers = async (shopId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/followers/${shopId}`, {
      headers: getHeaders(false), 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shop followers:', error);
    toast.error('An error occurred while fetching shop followers.');
    throw error; 
  }
};

export const getReviewById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching review:', error);
    toast.error('An error occurred while fetching the review.');
    throw error;
  }
};

export const getShopById = async (shopId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/shops/${shopId}`, {
      headers: getHeaders(false),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shop information:', error);
    toast.error('An error occurred while fetching shop information.');
    throw error;
  }
};