'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { jobsApi } from '@/lib/api/jobs';
import { Job } from '@/lib/supabase';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

interface JobStatusProps {
  jobId: string;
}

const statusConfig = {
  pending: { 
    icon: Clock, 
    color: 'text-yellow-500', 
    bg: 'bg-yellow-500/10',
    title: 'Queued',
    description: 'Your job is in the queue and will start soon'
  },
  running: { 
    icon: AlertCircle, 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10',
    title: 'Training in Progress',
    description: 'AI is analyzing your data and training the model'
  },
  completed: { 
    icon: CheckCircle, 
    color: 'text-green-500', 
    bg: 'bg-green-500/10',
    title: 'Completed Successfully',
    description: 'Your model has been trained and is ready to use'
  },
  failed: { 
    icon: XCircle, 
    color: 'text-red-500', 
    bg: 'bg-red-500/10',
    title: 'Training Failed',
    description: 'There was an error during the training process'
  },
};

export function JobStatus({ jobId }: JobStatusProps) {
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchJobDetails();
    
    // Subscribe to job updates
    const unsubscribe = jobsApi.subscribeToJob(jobId, (updatedJob) => {
      setJobDetails(updatedJob);
    });

    return unsubscribe;
  }, [jobId]);

  const fetchJobDetails = async (silent = false) => {
    if (!silent) setIsRefreshing(true);
    
    try {
      const job = await jobsApi.getJob(jobId);
      setJobDetails(job);
    } catch (error: any) {
      console.error('Error fetching job details:', error);
      toast.error('Failed to fetch job details');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Job Not Found</h3>
          <p className="text-muted-foreground">
            The requested job could not be found.
          </p>
        </CardContent>
      </Card>
    );
  }

  const StatusIcon = statusConfig[jobDetails.status].icon;
  const config = statusConfig[jobDetails.status];

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${config.bg}`}>
                  <StatusIcon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{config.title}</span>
                    <Badge variant="outline" className="capitalize">
                      {jobDetails.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{config.description}</CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchJobDetails()}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Task Description</p>
                <p className="font-medium">{jobDetails.prompt}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Job ID:</span>
                  <span className="ml-2 font-mono">{jobDetails.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <span className="ml-2">{new Date(jobDetails.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="ml-2">{new Date(jobDetails.updated_at).toLocaleString()}</span>
                </div>
              </div>

              {jobDetails.status === 'running' && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{jobDetails.progress}%</span>
                  </div>
                  <Progress value={jobDetails.progress} className="w-full" />
                </div>
              )}

              {jobDetails.status === 'completed' && (
                <div className="flex space-x-4">
                  <Link href={`/result/${jobDetails.id}`}>
                    <Button>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Results
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Error Message */}
      {jobDetails.status === 'failed' && jobDetails.error_message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Error Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm bg-red-50 dark:bg-red-900/20 p-4 rounded-lg font-mono">
                {jobDetails.error_message}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Logs */}
      {jobDetails.logs && jobDetails.logs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Training Logs</CardTitle>
              <CardDescription>
                Real-time updates from the training process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <div className="space-y-2 font-mono text-sm">
                  {jobDetails.logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start space-x-2"
                    >
                      <span className="text-muted-foreground text-xs">
                        [{new Date().toLocaleTimeString()}]
                      </span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}