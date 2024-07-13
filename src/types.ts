export interface Discount {
  id: number;
  name: string;
  initial_price: string;
  discount: string;
  price_after_discount: string;
  percentage_discount: number;
  amount: string;
  expiry_date: string;
  slug: string;
  image_url: string;
  service_time_hours: number;
  category: string;
  verified: boolean;
  description: string;
  shop_id: number;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: number;
  title: string;
  body: string;
  priority: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Stat {
  current_week: number;
  previous_week: number;
  percentage_change: number;
  change_status: 'positive' | 'negative' | 'neutral';
}

export interface WeeklyStats {
  users: Stat;
  discounts: Stat;
  appointments: Stat;
  shops: Stat;
}

export interface Payment {
  id: number;
  user_id: number;
  payment_date: string;
  discount_id: number;
  discount_name: string;
  amount: string;
  phone: string;
  status: string;
  gateway: string;
  code: string;
  used: number;
}

export interface Booking {
    id: number;
    discount: {
        name: string;
        discount: string;
        price_after_discount: string;
    };
    user: {
        first_name: string;
        last_name: string;
        phone: string | null;
    };
    time_slot: {
        id: number;
        date: string;
        start_time: string;
        end_time: string;
    };
    created_at: string;
    approved: number;
}

export interface DiscountData {
    id: number;
    name: string;
    initial_price: number;
    discount: number;
    image_url: string;
    expiry_date: string;
    service_time_hours: number;
    category: string;
    description: string;
    shop_id: number;
}

export interface Shop {
  id: string;
  name: string,
  location: string,
  store_type: string,
}

export interface StoreData {
  name: string;
  location: string;
  store_type: string;
  image_url: string; 
}

export interface Store {
  id: string;
  name: string;
  image_url: string;
  number: number;
  store_type: string;
}

export interface Category {
  name: string;
  image_url: string;
}

export interface Review {
  id: number;
  body: string;
  created_at: string;
  user_id: number;
  user_name: string;
  reviewable_type: string;
}

export interface SocialLink {
    id: number;
    url: string;
}

export interface DeleteSocialLinkResponse {
    message: string;
}