import { createClient } from '@supabase/supabase-js';

// Provide fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Only throw error in production if values are missing
if (typeof window !== 'undefined' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn('Supabase environment variables are not set. Some features may not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Types for our application
export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  user_id: string;
  prompt: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  logs: string[];
  error_message?: string;
  result_summary?: string;
  created_at: string;
  updated_at: string;
}

export interface JobResult {
  id: string;
  job_id: string;
  model_type: string;
  accuracy: number;
  loss: number;
  training_time: number;
  dataset_size: number;
  features_used: string[];
  model_size: string;
  download_url?: string;
  api_endpoint?: string;
  metrics: {
    precision: number;
    recall: number;
    f1_score: number;
    confusion_matrix?: number[][];
  };
  feature_importance?: Array<{
    feature: string;
    importance: number;
  }>;
  predictions_sample?: Array<{
    input: string;
    predicted: string;
    confidence: number;
  }>;
  created_at: string;
}