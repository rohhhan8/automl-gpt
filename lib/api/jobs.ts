import { supabase, Job, JobResult } from '@/lib/supabase';

export const jobsApi = {
  // Create a new job
  createJob: async (prompt: string): Promise<Job> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('jobs')
        .insert({
          user_id: user.id,
          prompt: prompt.trim(),
          status: 'pending',
          progress: 0,
          logs: ['Job created and queued for processing...'],
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  // Get all jobs for the current user
  getUserJobs: async (): Promise<Job[]> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching user jobs:', error);
      return [];
    }
  },

  // Get a specific job by ID
  getJob: async (jobId: string): Promise<Job | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Job not found
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching job:', error);
      return null;
    }
  },

  // Get job result
  getJobResult: async (jobId: string): Promise<JobResult | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // First verify the job belongs to the user
      const job = await jobsApi.getJob(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      const { data, error } = await supabase
        .from('job_results')
        .select('*')
        .eq('job_id', jobId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Result not found
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching job result:', error);
      return null;
    }
  },

  // Subscribe to job updates
  subscribeToJob: (jobId: string, callback: (job: Job) => void) => {
    try {
      const subscription = supabase
        .channel(`job-${jobId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'jobs',
            filter: `id=eq.${jobId}`,
          },
          (payload) => {
            callback(payload.new as Job);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error subscribing to job updates:', error);
      return () => {};
    }
  },

  // Subscribe to all user jobs
  subscribeToUserJobs: (callback: (jobs: Job[]) => void) => {
    try {
      const subscription = supabase
        .channel('user-jobs')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'jobs',
          },
          async () => {
            // Refetch all jobs when any job changes
            try {
              const jobs = await jobsApi.getUserJobs();
              callback(jobs);
            } catch (error) {
              console.error('Error fetching updated jobs:', error);
            }
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error subscribing to user jobs:', error);
      return () => {};
    }
  },
};