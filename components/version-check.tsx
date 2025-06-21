'use client';

import { useEffect } from 'react';

export function VersionCheck() {
  useEffect(() => {
    // Check if we're in production and force cache refresh
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const currentVersion = process.env.NEXT_PUBLIC_BUILD_TIME;
      const storedVersion = localStorage.getItem('app_version');
      
      if (storedVersion && storedVersion !== currentVersion) {
        // Version mismatch - clear cache and reload
        console.log('🔄 App version updated, clearing cache...');
        
        // Clear various caches
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              caches.delete(name);
            });
          });
        }
        
        // Clear localStorage except for essential auth data
        const authKeys = ['supabase.auth.token', 'sb-auth-token'];
        const keysToKeep = authKeys.filter(key => localStorage.getItem(key));
        const authData: Record<string, string> = {};
        
        keysToKeep.forEach(key => {
          const value = localStorage.getItem(key);
          if (value) authData[key] = value;
        });
        
        localStorage.clear();
        
        // Restore auth data
        Object.entries(authData).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        
        // Store new version
        localStorage.setItem('app_version', currentVersion || 'unknown');
        
        // Force reload
        window.location.reload();
      } else if (!storedVersion) {
        // First time - store version
        localStorage.setItem('app_version', currentVersion || 'unknown');
      }
    }
  }, []);

  return null;
}