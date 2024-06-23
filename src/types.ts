// src/types.ts
export interface Discount {
  id: number;
  name: string;
  initial_price: string;
  discount: string;
  price_after_discount: string;
  percentage_discount: string;
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
