'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { supabase, Job } from '@/lib/supabase';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  FileText,
  Calendar,
  Brain
} from 'lucide-react';
import Link from 'next/link';

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  running: { icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  completed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
};

export function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, statusFilter]);

  const fetchJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      setJobs(data || []);
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;
    
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }
    
    setFilteredJobs(filtered);
  };

  const stats = {
    total: jobs.length,
    completed: jobs.filter(j => j.status === 'completed').length,
    running: jobs.filter(j => j.status === 'running').length,
    failed: jobs.filter(j => j.status === 'failed').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content Container - Centered */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Welcome Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 mt-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Welcome back, {profile?.name || user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Manage your ML projects and track progress in real-time.
            </p>
          </motion.div>

          {/* Stats Cards - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                <Brain className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  All your ML projects
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Ready to use
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.running}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently training
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
                <XCircle className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Need attention
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Projects Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <h2 className="text-3xl font-bold">Your AI Projects</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-background border-border/50"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-border/50 rounded-md bg-background text-sm min-w-[120px]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="running">Running</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full"
                />
              </div>
            ) : filteredJobs.length === 0 ? (
              <Card className="border-dashed border-border/50 bg-muted/20">
                <CardContent className="py-16 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-3">No projects found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto text-base mb-6">
                    {jobs.length === 0
                      ? "Start your first AI project by creating a new project from the home page."
                      : "Try adjusting your search or filter criteria to find your projects."
                    }
                  </p>
                  {jobs.length === 0 && (
                    <Link href="/">
                      <Button>
                        Create Your First Project
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job, index) => {
                  const StatusIcon = statusConfig[job.status].icon;
                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20 bg-background">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0 mr-6">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`p-2 rounded-full ${statusConfig[job.status].bg}`}>
                                  <StatusIcon className={`w-4 h-4 ${statusConfig[job.status].color}`} />
                                </div>
                                <Badge variant="outline" className="capitalize text-xs px-2 py-1">
                                  {job.status}
                                </Badge>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(job.created_at).toLocaleDateString()}
                                </div>
                              </div>
                              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{job.prompt}</h3>
                              <p className="text-xs text-muted-foreground mb-2">
                                Job ID: <span className="font-mono">{job.id}</span>
                              </p>
                              {job.result_summary && (
                                <p className="text-xs text-green-600 font-medium">
                                  ✅ {job.result_summary}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Link href={`/status/${job.id}`}>
                                <Button variant="outline" size="sm" className="w-full min-w-[100px]">
                                  View Status
                                </Button>
                              </Link>
                              {job.status === 'completed' && (
                                <Link href={`/result/${job.id}`}>
                                  <Button size="sm" className="w-full min-w-[100px]">
                                    <BarChart3 className="w-3 h-3 mr-1" />
                                    Results
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}