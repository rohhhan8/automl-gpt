'use client';

import { motion } from 'framer-motion';
import { JobResult } from '@/components/job/job-result';
import { useParams } from 'next/navigation';

export default function JobResultPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Results</h1>
          <p className="text-muted-foreground text-lg">
            View your trained model results and insights
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <JobResult jobId={jobId} />
        </motion.div>
      </div>
    </motion.div>
  );
}