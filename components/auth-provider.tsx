'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, Profile } from '@/lib/supabase';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchProfile(session.user.id);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Try to fetch profile first
          const profileExists = await fetchProfile(session.user.id);
          
          // If profile doesn't exist, create it
          if (!profileExists) {
            console.log('🆕 Profile not found, creating new profile...');
            await handleNewUser(session.user, event);
          } else {
            console.log('👋 Existing user with profile found');
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleNewUser = async (user: User, event: string) => {
    try {
      console.log('👤 Creating profile for user:', user.email);
      
      const userName = user.user_metadata?.name || 
                      user.user_metadata?.full_name || 
                      user.email?.split('@')[0] || 
                      'User';

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email!,
          name: userName,
          avatar_url: user.user_metadata?.avatar_url,
        });

      if (profileError) {
        // If error is because profile already exists, that's fine
        if (profileError.code === '23505') { // Unique constraint violation
          console.log('✅ Profile already exists, fetching...');
          await fetchProfile(user.id);
          return;
        } else {
          console.error('❌ Error creating profile:', profileError);
          return;
        }
      }

      console.log('✅ Profile created successfully');
      
      // Fetch the newly created profile
      await fetchProfile(user.id);
      
      // Show success message
      toast.success('Account created successfully!');
      
    } catch (error) {
      console.error('❌ Error in handleNewUser:', error);
    }
  };

  const fetchProfile = async (userId: string): Promise<boolean> => {
    try {
      console.log('🔍 Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('📝 Profile not found for user:', userId);
          setProfile(null);
          return false;
        }
        console.error('❌ Error fetching profile:', error);
        return false;
      }

      console.log('✅ Profile found:', data.email);
      setProfile(data);
      return true;
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
      return false;
    }
  };

  const createProfile = async (user: User, name: string) => {
    try {
      console.log('👤 Creating profile for email/password user:', user.email);
      
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email!,
          name,
          avatar_url: user.user_metadata?.avatar_url,
        });

      if (error) {
        console.error('❌ Error creating profile:', error);
        throw error;
      }

      console.log('✅ Profile created successfully for email/password user');
      await fetchProfile(user.id);
    } catch (error) {
      console.error('❌ Error creating profile:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('🚀 Starting email/password signup for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error('❌ Supabase signup error:', error);
        throw error;
      }

      console.log('✅ Supabase signup successful:', data.user?.email);

      if (data.user) {
        // Create profile
        await createProfile(data.user, name);
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      console.error('❌ Signup error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success('Welcome back!');
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('🔗 Starting Google OAuth...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('❌ Supabase OAuth error:', error);
        throw error;
      }

      console.log('✅ OAuth initiated successfully');
    } catch (error: any) {
      console.error('❌ Error signing in with Google:', error);
      toast.error(error.message || 'Failed to sign in with Google');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 Starting sign out process...');
      
      // Clear local state immediately for better UX
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Supabase sign out error:', error);
        // Even if there's an error, we've cleared local state
        // so the user appears signed out
      }
      
      console.log('✅ Sign out completed');
      toast.success('Signed out successfully');
      
      // Force a page reload to ensure clean state
      if (typeof window !== 'undefined') {
        // Small delay to show the toast
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }
      
    } catch (error: any) {
      console.error('❌ Error signing out:', error);
      
      // Even if there's an error, clear local state
      setUser(null);
      setProfile(null);
      setSession(null);
      
      toast.error('Sign out completed (with errors)');
      
      // Still redirect to home
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      await fetchProfile(user.id);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}