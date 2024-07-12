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

