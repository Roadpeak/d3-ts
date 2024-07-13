// src/types.ts
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
  description: string;
  verified: boolean;
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