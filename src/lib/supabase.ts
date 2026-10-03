import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables.\n" +
      "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Database types ───────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  business_name: string;
  slug: string;
  country: string | null;
  avatar_url: string | null;
  logo_url: string | null;
  plan_id: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  creator_id: string;
  name: string;
  slug: string;
  description: string | null;
  product_type: string;
  price: number;
  currency: string;
  cover_image_url: string | null;
  file_path: string | null;
  file_size: number | null;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  creator_id: string;
  product_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed" | "refunded";
  payment_provider: string;
  payment_reference: string | null;
  created_at: string;
  updated_at: string;
  // joined fields
  product?: Pick<Product, "name" | "price" | "currency">;
  customer?: { name: string; email: string };
}

export interface Customer {
  id: string;
  creator_id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
}
