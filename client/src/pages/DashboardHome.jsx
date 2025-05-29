import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Box, Server, CreditCard, Activity, Clock, BarChart2, 
  Plus, ChevronRight, CheckCircle, AlertCircle, XCircle, 
  RefreshCw, ArrowUpRight, Loader2, Rocket, Cpu, Database,
  Shield, Link as LinkIcon, Globe, Settings, TrendingUp, 
  TrendingDown, Circle, Bell, Mail, ExternalLink, ChevronDown
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import "../index.css";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeCalls: 0,
    avgResponseTime: 0,
    successRate: 0,
    paymentTransactions: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [showPageLoader, setShowPageLoader] = useState(false);

  // YouTube-style page loading indicator
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setShowPageLoader(true);
    };

    const handleRouteChangeComplete = () => {
      setShowPageLoader(false);
    };

    window.addEventListener('beforeunload', handleRouteChangeStart);
    window.addEventListener('load', handleRouteChangeComplete);

    return () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
      window.removeEventListener('load', handleRouteChangeComplete);
    };
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, activityRes] = await Promise.all([
          axios.get('http://localhost:3500/api/dashboard/stats'),
          axios.get('http://localhost:3500/api/dashboard/activity')
        ]);
        
        setStats(statsRes.data);
        setRecentActivity(activityRes.data.slice(0, 5));
      } catch (error) {
        toast.error('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (stats) {
        setStats(prev => ({
          ...prev,
          activeCalls: prev.activeCalls + Math.floor(Math.random() * 10),
          paymentTransactions: prev.paymentTransactions + Math.floor(Math.random() * 3)
        }));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateProject = () => {
    navigate('/create/new');
  };

  const getTrendIcon = (value, threshold = 0) => {
    return value > threshold ? 
      <TrendingUp className="h-4 w-4 text-green-400" /> : 
      <TrendingDown className="h-4 w-4 text-red-400" />;
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative">
      {/* YouTube-style page loading indicator */}
      {showPageLoader && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pageLoader"></div>
        </div>
      )}

      <Navbar />
      
      <div className="p-4 md:p-6 pt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pt-12 md:pt-16 lg:pt-20">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
              <Zap className="h-8 w-8" />
              Dashboard Overview
            </h1>
            <p className="text-gray-400 mt-1 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Real-time monitoring and analytics for your integrations
            </p>
          </div>
          
          <button 
            onClick={handleCreateProject}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
          >
            <Rocket className="h-4 w-4" />
            <span>New Project</span>
          </button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Projects */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Box className="h-5 w-5" />
                <span className="text-sm">Total Projects</span>
              </div>
              <div className="text-xs px-2 py-1 bg-gray-800 text-cyan-400 rounded-full">
                ALL
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-100">
                {loading ? '--' : stats.totalProjects}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                {getTrendIcon(1)}
                <span>+2 this week</span>
              </div>
            </div>
          </motion.div>
          
          {/* Active API Calls */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Server className="h-5 w-5" />
                <span className="text-sm">Active API Calls</span>
              </div>
              <div className="text-xs px-2 py-1 bg-gray-800 text-green-400 rounded-full flex items-center gap-1">
                <Clock className="h-3 w-3" />
                TODAY
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-100">
                {loading ? '--' : stats.activeCalls.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                {getTrendIcon(5, 3)}
                <span>+12% from yesterday</span>
              </div>
            </div>
          </motion.div>
          
          {/* Avg Response Time */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <BarChart2 className="h-5 w-5" />
                <span className="text-sm">Avg Response Time</span>
              </div>
              <div className="text-xs px-2 py-1 bg-gray-800 text-amber-400 rounded-full">
                MS
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-100">
                {loading ? '--' : stats.avgResponseTime}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                {getTrendIcon(150, 200)}
                <span>-8% from yesterday</span>
              </div>
            </div>
          </motion.div>
          
          {/* Success Rate */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Success Rate</span>
              </div>
              <div className="text-xs px-2 py-1 bg-gray-800 text-green-400 rounded-full">
                %
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-100">
                {loading ? '--' : stats.successRate}%
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                {getTrendIcon(stats.successRate, 97)}
                <span>+0.5% from yesterday</span>
              </div>
            </div>
          </motion.div>
          
          {/* Payment Transactions */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">Payment Transactions</span>
              </div>
              <div className="text-xs px-2 py-1 bg-gray-800 text-purple-400 rounded-full flex items-center gap-1">
                <Clock className="h-3 w-3" />
                TODAY
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-100">
                {loading ? '--' : stats.paymentTransactions.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                {getTrendIcon(5, 3)}
                <span>+15% from yesterday</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyan-400" />
                Recent Activity
              </h2>
              <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 hover:bg-gray-900/50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-100">{activity.message}</p>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Project: <span className="text-cyan-400">{activity.project}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-purple-400" />
              Quick Actions
            </h2>
            
            <div className="space-y-3">
              <motion.button
                whileHover={{ x: 5 }}
                onClick={handleCreateProject}
                className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Plus className="h-5 w-5 text-purple-400" />
                  </div>
                  <span>Create New Project</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Server className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span>API Documentation</span>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                  </div>
                  <span>Payment Settings</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <span>Security Settings</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Bell className="h-5 w-5 text-amber-400" />
                  </div>
                  <span>Notification Settings</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;