import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';

export interface UserProfile {
  name: string;
  profilePicture: string;
}

const PROFILE_PICTURE_STORAGE_KEY = 'devlog-profile-picture';

const defaultProfile: UserProfile = {
  name: '',
  profilePicture: ''
};

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load profile data and listen for auth changes
  useEffect(() => {
    if (!supabase) {
      // Fallback to localStorage if Supabase is not configured
      loadLocalProfile();
      return;
    }

    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session with longer timeout
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 10000)
        );

        const { data: { session }, error: sessionError } = await Promise.race([
          sessionPromise,
          timeoutPromise
        ]) as any;
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          if (mounted) {
            loadLocalProfile();
          }
          return;
        }

        if (mounted) {
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await loadUserProfile(session.user.id);
          } else {
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          // Fallback to local profile on any auth error
          loadLocalProfile();
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session?.user?.email);
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Add longer timeout to prevent infinite loading
          const timeoutId = setTimeout(() => {
            if (mounted) {
              console.warn('Profile loading timed out, falling back to local storage');
              loadLocalProfile();
            }
          }, 15000); // 15 second timeout

          try {
            await loadUserProfile(session.user.id);
            clearTimeout(timeoutId);
          } catch (err) {
            clearTimeout(timeoutId);
            console.error('Error in auth state change profile loading:', err);
            if (mounted) {
              loadLocalProfile();
            }
          }
        } else {
          setProfile(defaultProfile);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadLocalProfile = () => {
    try {
      const storedName = localStorage.getItem('devlog-user-name') || '';
      const storedProfilePicture = localStorage.getItem(PROFILE_PICTURE_STORAGE_KEY) || '';
      setProfile({
        name: storedName,
        profilePicture: storedProfilePicture
      });
    } catch (err) {
      console.error('Error loading local profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      setError(null);
      console.log('Loading profile for user:', userId);

      // Load profile picture from localStorage (browser-only storage)
      const storedProfilePicture = localStorage.getItem(PROFILE_PICTURE_STORAGE_KEY) || '';

      // Test Supabase connection first
      if (!supabase) {
        throw new Error('Supabase not configured');
      }

      // Fetch user profile from Supabase with longer timeout
      console.log('Fetching profile from database...');
      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 10000)
      );

      const { data: profileData, error: fetchError } = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]) as any;

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Profile fetch error:', fetchError);
        throw fetchError;
      }

      if (profileData) {
        console.log('Profile found:', profileData);
        setProfile({
          name: profileData.name,
          profilePicture: storedProfilePicture
        });
      } else {
        console.log('No profile found, creating new one...');
        // No profile exists, create one with longer timeout
        const insertPromise = supabase
          .from('profiles')
          .insert({
            user_id: userId,
            name: 'Anonymous Developer'
          })
          .select()
          .single();

        const insertTimeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Profile creation timeout')), 10000)
        );

        const { data: newProfile, error: insertError } = await Promise.race([
          insertPromise,
          insertTimeoutPromise
        ]) as any;

        if (insertError) {
          console.error('Profile creation error:', insertError);
          
          // If it's a duplicate key error, try to fetch the existing profile
          if (insertError.code === '23505') {
            const { data: existingProfile } = await Promise.race([
              supabase
                .from('profiles')
                .select('*')
                .eq('user_id', userId)
                .single(),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Existing profile fetch timeout')), 8000)
              )
            ]) as any;
            
            if (existingProfile) {
              setProfile({
                name: existingProfile.name,
                profilePicture: storedProfilePicture
              });
            } else {
              throw insertError;
            }
          } else {
            throw insertError;
          }
        } else {
          setProfile({
            name: newProfile.name,
            profilePicture: storedProfilePicture
          });
        }
      }
    } catch (err: any) {
      console.error('Error loading user profile:', err);
      
      // Always fallback to local storage on any database error
      console.log('Falling back to local storage due to database error');
      const storedName = localStorage.getItem('devlog-user-name') || 'Anonymous Developer';
      const storedProfilePicture = localStorage.getItem(PROFILE_PICTURE_STORAGE_KEY) || '';
      
      setProfile({
        name: storedName,
        profilePicture: storedProfilePicture
      });
      
      // Only set error for non-timeout issues
      if (!err.message.includes('timeout') && !err.message.includes('Supabase not configured')) {
        setError('Failed to load profile from database, using local storage');
      }
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const updateProfile = async (newProfile: Partial<UserProfile>) => {
    try {
      setError(null);
      const updatedProfile = { ...profile, ...newProfile };

      // Always update profile picture in localStorage (browser-only)
      if (newProfile.profilePicture !== undefined) {
        if (newProfile.profilePicture) {
          localStorage.setItem(PROFILE_PICTURE_STORAGE_KEY, newProfile.profilePicture);
        } else {
          localStorage.removeItem(PROFILE_PICTURE_STORAGE_KEY);
        }
      }

      // Update name in Supabase if available and user is authenticated
      if (supabase && user && newProfile.name !== undefined) {
        try {
          const updatePromise = supabase
            .from('profiles')
            .update({ name: newProfile.name })
            .eq('user_id', user.id);

          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Update timeout')), 8000)
          );

          const { error: updateError } = await Promise.race([
            updatePromise,
            timeoutPromise
          ]) as any;

          if (updateError) {
            throw updateError;
          }
        } catch (dbError) {
          console.warn('Database update failed, falling back to localStorage:', dbError);
          // Continue with localStorage fallback below
        }
      }

      // Always update localStorage as fallback
      if (newProfile.name !== undefined) {
        localStorage.setItem('devlog-user-name', newProfile.name);
      }

      setProfile(updatedProfile);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      
      // Still update locally even if Supabase fails
      const updatedProfile = { ...profile, ...newProfile };
      setProfile(updatedProfile);
      
      // Fallback to localStorage for name
      if (newProfile.name !== undefined) {
        localStorage.setItem('devlog-user-name', newProfile.name);
      }
      
      setError('Profile updated locally (database sync failed)');
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      
      if (supabase) {
        try {
          // Check if we have a valid session before attempting to sign out
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            const signOutPromise = supabase.auth.signOut();
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Sign out timeout')), 8000)
            );

            const { error } = await Promise.race([
              signOutPromise,
              timeoutPromise
            ]) as any;

            if (error && error.message !== 'Session from session_id claim in JWT does not exist') {
              throw error;
            }
          } else {
            console.log('No active session found, proceeding with local cleanup');
          }
        } catch (signOutError: any) {
          // Ignore session not found errors as they indicate we're already signed out
          if (!signOutError.message?.includes('session_not_found') && 
              !signOutError.message?.includes('Session from session_id claim in JWT does not exist')) {
            console.warn('Supabase sign out failed, continuing with local cleanup:', signOutError);
          }
        }
      }

      // Clear local storage
      localStorage.removeItem(PROFILE_PICTURE_STORAGE_KEY);
      localStorage.removeItem('devlog-user-name');
      
      setUser(null);
      setProfile(defaultProfile);
    } catch (err: any) {
      console.error('Error signing out:', err);
      
      // Still clear local data even if Supabase sign out fails
      localStorage.removeItem(PROFILE_PICTURE_STORAGE_KEY);
      localStorage.removeItem('devlog-user-name');
      setUser(null);
      setProfile(defaultProfile);
      
      setError('Signed out locally (server sync may have failed)');
    }
  };

  return {
    profile,
    user,
    loading,
    error,
    updateProfile,
    signOut,
    hasProfile: profile.name.trim() !== '',
    isAuthenticated: !!user,
    isSupabaseConnected: !!supabase
  };
};