'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { jobsApi } from '@/lib/api/jobs';
import { Job, JobResult as JobResultType } from '@/lib/supabase';
import { 
  Download, 
  Share, 
  BarChart3, 
  Target, 
  TrendingUp, 
  FileText,
  Code,
  RefreshCw
} from 'lucide-react';

interface JobResultProps {
  jobId: string;
}

export function JobResult({ jobId }: JobResultProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [result, setResult] = useState<JobResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [jobId]);

  const fetchResult = async () => {
    try {
      const [jobData, resultData] = await Promise.all([
        jobsApi.getJob(jobId),
        jobsApi.getJobResult(jobId)
      ]);
      
      setJob(jobData);
      setResult(resultData);
    } catch (error: any) {
      console.error('Error fetching results:', error);
      toast.error('Failed to fetch results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (result?.download_url) {
      window.open(result.download_url, '_blank');
    } else {
      toast.error('Download not available');
    }
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'ML Model Results',
          text: `Check out my AI model: ${job?.prompt}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      } catch (clipboardError) {
        toast.error('Failed to share or copy link');
      }
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

  if (!job || !result) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
          <p className="text-muted-foreground">
            Results are not available for this job yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-6 h-6" />
                  <span>Model Results</span>
                  <Badge variant="outline" className="capitalize">
                    {job.status}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  {job.prompt}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {(result.accuracy * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">F1 Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {result.metrics.f1_score.toFixed(3)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Time</CardTitle>
            <RefreshCw className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {Math.round(result.training_time)}s
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dataset Size</CardTitle>
            <FileText className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              {result.dataset_size.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Detailed evaluation of your model's performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Precision</p>
                  <p className="text-lg font-semibold">{result.metrics.precision.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recall</p>
                  <p className="text-lg font-semibold">{result.metrics.recall.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model Type</p>
                  <p className="text-lg font-semibold">{result.model_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model Size</p>
                  <p className="text-lg font-semibold">{result.model_size}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Importance</CardTitle>
            <CardDescription>
              Most important features used by your model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.feature_importance?.slice(0, 5).map((feature, index) => (
                <div key={feature.feature} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{feature.feature}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${feature.importance * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {(feature.importance * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sample Predictions */}
      {result.predictions_sample && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sample Predictions</CardTitle>
              <CardDescription>
                Examples of how your model performs on real data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.predictions_sample.map((prediction, index) => (
                  <div key={index} className="bg-muted/50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Input</p>
                        <p className="text-sm font-mono">{prediction.input}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Prediction</p>
                        <p className="text-sm font-semibold">{prediction.predicted}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all duration-300"
                              style={{ width: `${prediction.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">
                            {(prediction.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* API Information */}
      {result.api_endpoint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>API Access</span>
              </CardTitle>
              <CardDescription>
                Use your trained model programmatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Endpoint URL</p>
                <code className="text-sm font-mono bg-background p-2 rounded block">
                  {result.api_endpoint}
                </code>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}