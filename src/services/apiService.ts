import axios, { AxiosResponse } from 'axios';
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

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    user_type: string;
    active: boolean;
}

export interface Payment {
  id: number;
  user_id: number;
  payment_date: string;
  discount_id: number;
  amount: string;
  phone: string;
  status: string;
  gateway: string;
  code: string;
  used: number;
}

interface Appointment {
  id: number;
  user_first_name: string;
  user_last_name: string;
  user_phone: string;
  discount_name: string;
  shop_name: string;
  time_slot_date: string;
  time_slot_start_time: string;
  time_slot_end_time: string;
  approved: boolean;
}

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

interface Shop {
  id: number;
  name: string;
  location: string;
  seller_first_name: string;
  seller_last_name: string;
  seller_phone: string;
  verified: boolean;
}

interface AppointmentResponse {
  data: Appointment[];
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
    const response = await axios.get(`${BASE_URL}/followers/${shopId}`);
    return response.data;
  } catch (error) {
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
    return response.data; 
  } catch (error) {
    console.error('Error verifying discount:', error);
    throw error; 
  }
};

export const fetchShops = async (): Promise<Shop[]> => {
  try {
    const response = await axios.get<Shop[]>(`${BASE_URL}/shops`); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error; 
  }
};

export const fetchLatestShops = async (): Promise<Shop[]> => {
  try {
    const response = await axios.get<Shop[]>(`${BASE_URL}/shops/latest`, {
    headers: getHeaders(),
  }); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error; 
  }
};

export const verifyShop = async (shopId: number) => {
  const response = await axios.put(`${BASE_URL}/shops/${shopId}/verify`, {}, {
    headers: getHeaders(),
  });
  return response.data;
};

export const unverifyShop = async (shopId: number) => {
  const response = await axios.put(`${BASE_URL}/shops/${shopId}/suspend`, {}, {
    headers: getHeaders(),
  });
  return response.data;
};

export const fetchPayments = async (): Promise<Payment[]> => {
  try {
    const response = await axios.get<{ payments: Payment[] }>(`${BASE_URL}/payments`, {
      headers: getHeaders(),
    });
    return response.data.payments;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${BASE_URL}/users`, {
      headers: getHeaders(),
    }); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; 
  }
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response: AxiosResponse<AppointmentResponse> = await axios.get<AppointmentResponse>(`${BASE_URL}/bookings`, {
      headers: getHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const fetchFirstSixAppointments = async (): Promise<Appointment[]> => {
  try {
    const response: AxiosResponse<AppointmentResponse> = await axios.get<AppointmentResponse>(`${BASE_URL}/bookings/recent`, {
      headers: getHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const submitTicket = async (formData: { title: string; body: string; priority: string }, resetForm: () => void) => {
  try {
    await axios.post(
      `${BASE_URL}/tickets`, 
      formData, 
      { headers: getHeaders() }
    );
    toast("Ticket submitted!");
    resetForm();
  } catch (error) {
    console.error('Error submitting ticket:', error);
    toast.error('Error submitting ticket');
  }
};

export const getUserTickets = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tickets/user`, 
      { headers: getHeaders() }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    toast.error('Error fetching user tickets');
    return [];
  }
};

export const getAllTickets = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tickets`, 
      { headers: getHeaders() }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    toast.error('Error fetching user tickets');
    return [];
  }
};

export const getShopReviews = async (shopId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/shops/${shopId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const initializeConversation = async (userId: number) => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('Access token not found');
  }

  try {
    const response = await axios.post(
      'https://api.discoun3ree.com/api/conversations/initialize',
      { user_id: userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error initializing conversation:.`);
  }
};