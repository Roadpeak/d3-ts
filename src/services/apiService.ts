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

interface VerifyDiscountParams {
  discountId: number;
  accessToken: string | null;
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
    throw error;
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
    throw error; 
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

export const getUnverifiedDiscountsByShop = async (shopId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/shops/${shopId}/unverified-discounts`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching unverified discounts:', error);
    toast.error('An error occurred while fetching unverified discounts.');
    throw error;
  }
};

export const approveBooking = async (bookingId: number, code: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/bookings/${bookingId}/approve`, { code }, {
      headers: getHeaders(),
    });
    toast.success('Booking approved successfully!');
    return response.data;
  } catch (error) {
    console.error('Error approving booking:', error);
    toast.error('An error occurred while approving the booking.');
    throw error;
  }
};


export const getDiscounts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/discounts`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching discounts:', error);
    toast.error('An error occurred while fetching discounts.');
    throw error;
  }
};

export const getUnverifiedDiscounts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/discounts/unverified`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching unverified discounts:', error);
    toast.error('An error occurred while fetching unverified discounts.');
    throw error;
  }
}

export const deleteDiscount = async (id: number) => {
  try {
    const response = await axios.delete(`https://api.discoun3ree.com/api/discounts/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const verifyDiscount = async ({ discountId, accessToken }: VerifyDiscountParams) => {
  try {
    const response = await axios.put(
      `https://api.discoun3ree.com/api/discounts/${discountId}/verify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error verifying discount:', error);
    throw error; // Throw the error to be handled where this function is called
  }
};