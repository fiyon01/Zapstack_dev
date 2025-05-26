import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ArrowLeft, Settings, Trash2, Edit, ExternalLink, Clock, BarChart2,
  AlertCircle, CheckCircle, XCircle, Copy, RotateCw, ChevronDown,
  Server, CreditCard, Key, Globe, Link as LinkIcon, Lock, Activity,
  RefreshCw, Zap, Cpu, Shield, Database, Loader2, ChevronRight, ChevronLeft
} from 'lucide-react';
import Navbar from '../components/Navbar';

const ManageProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [requests, setRequests] = useState(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLogsPage, setCurrentLogsPage] = useState(1);
  const logsPerPage = 10;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
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

  // Toast notification IDs to prevent duplicates
  const toastIds = {
    projectError: 'project-error',
    logsError: 'logs-error',
    rotateKeyError: 'rotate-key-error',
    deleteError: 'delete-error'
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProjectLoading(true);
        const response = await axios.get(`http://localhost:3500/api/projects/${projectId}`);
        console.log(response.data.project)
        setProject(response.data.project || []);
        setRequests(response.data.totalRequests);
        toast.dismiss(toastIds.projectError);
      } catch (error) {
        console.error('Error fetching project:', error);
        if (!toast.isActive(toastIds.projectError)) {
          toast.error('Failed to load project details', { toastId: toastIds.projectError });
        }
        setProject(null); // Explicitly set to null if fetch fails
      } finally {
        setProjectLoading(false);
      }
    };

    const fetchLogs = async () => {
      try {
        setLogsLoading(true);
        const response = await axios.get(`http://localhost:3500/api/projects/${projectId}/logs`);
        setLogs(response.data.logs || []);
        toast.dismiss(toastIds.logsError);
      } catch (error) {
        console.error('Error fetching logs:', error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch logs. Please try again later.';
        if (!toast.isActive(toastIds.logsError)) {
          toast.error(errorMessage, { toastId: toastIds.logsError });
        }
        setLogs([]); // Set empty array if logs fetch fails
      } finally {
        setLogsLoading(false);
      }
    };

    fetchProject();
    fetchLogs();
  }, [projectId, navigate]);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const rotateApiKey = async () => {
    try {
      const response = await axios.post(`http://localhost:3500/api/projects/${projectId}/rotate-key`);
      toast.success('API key rotated successfully!');
      setProject(prev => ({ ...prev, securedApiKey: response.data.newKey }));
      toast.dismiss(toastIds.rotateKeyError);
    } catch (error) {
      console.error('Error rotating key:', error);
      if (!toast.isActive(toastIds.rotateKeyError)) {
        toast.error('Failed to rotate API key', { toastId: toastIds.rotateKeyError });
      }
    }
  };

  const deleteProject = async () => {
    try {
      await axios.delete(`http://localhost:3500/api/projects/${projectId}`);
      toast.success('Project deleted successfully');
      navigate('/projects');
      toast.dismiss(toastIds.deleteError);
    } catch (error) {
      console.error('Error deleting project:', error);
      if (!toast.isActive(toastIds.deleteError)) {
        toast.error('Failed to delete project', { toastId: toastIds.deleteError });
      }
    }
  };

  const toggleExpandSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Pagination for logs
  const indexOfLastLog = currentLogsPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = Array.isArray(logs) ? logs.slice(indexOfFirstLog, indexOfLastLog) : [];
  const totalLogPages = Math.ceil(logs.length / logsPerPage);

  const paginateLogs = (pageNumber) => setCurrentLogsPage(pageNumber);

  const getStatusIcon = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (statusCode >= 400 && statusCode < 500) {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    } else if (statusCode >= 500) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return <CheckCircle className="h-4 w-4 text-blue-500" />;
  };

  if (projectLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Navbar />
        <div className="p-6 pt-20">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Navbar />
        <div className="p-6 pt-20">
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 text-center">
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              Project not found
            </h3>
            <p className="text-gray-500 mb-6">
              The project you're looking for doesn't exist or you don't have permission to access it.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative">
      {/* YouTube-style page loading indicator */}
      {showPageLoader && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pageLoader"></div>
        </div>
      )}

      <Navbar />
      
      <div className="p-6 pt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pt-12 ">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                {project.type === 'api_proxy' ? (
                  <Cpu className="h-6 w-6 text-cyan-400" />
                ) : (
                  <Activity className="h-6 w-6 text-purple-400" />
                )}
                {project.name || 'Unnamed Project'}
              </h1>
              <p className="text-gray-400 flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-gray-800 rounded-full flex items-center gap-1">
                  {project.type === 'api_proxy' ? (
                    <>
                      <Server className="h-3 w-3" />
                      API Project
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-3 w-3" />
                      Payments Project
                    </>
                  )}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Created {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(`/projects/${projectId}/edit`)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
            
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-900 text-red-400 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
        
        {/* Delete confirmation modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-medium text-gray-100 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Delete Project
                </h3>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete this project? This action cannot be undone and all associated data will be permanently removed.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteProject}
                    className="px-4 py-2 bg-red-900/50 hover:bg-red-900 text-red-400 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Project
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          {['overview', 'logs', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm relative flex items-center gap-1 ${activeTab === tab ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' ? (
                <BarChart2 className="h-4 w-4" />
              ) : tab === 'logs' ? (
                <Database className="h-4 w-4" />
              ) : (
                <Settings className="h-4 w-4" />
              )}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Details */}
                <div className="bg-gray-900 rounded-lg p-5 border border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-cyan-400" />
                    Project Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Project Name</label>
                      <p className="text-gray-100 font-medium">{project.name || 'Unnamed Project'}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Project Type</label>
                      <p className="text-gray-100 font-medium flex items-center gap-2">
                        {project.type === 'api_proxy' ? (
                          <>
                            <Server className="h-4 w-4 text-cyan-400" />
                            API Integration
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-4 w-4 text-purple-400" />
                            Payments Integration
                          </>
                        )}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Created At</label>
                      <p className="text-gray-100 font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {new Date(project.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="bg-gray-900 rounded-lg p-5 border border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-purple-400" />
                    Quick Stats
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-400">Total Requests</p>
                      <p className="text-2xl font-bold text-gray-100">
                        {logs?.length?.toLocaleString() || "0"}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-400">Success Rate</p>
                      <p className="text-2xl font-bold text-green-400">
                        {logs.length > 0 
                          ? `${Math.round((logs.filter(log => log.statusCode >= 200 && log.statusCode < 300).length / logs.length) * 100)}%`
                          : '0%'}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-400">Avg. Response</p>
                      <p className="text-2xl font-bold text-cyan-400">
                        {logs.length > 0 
                          ? `${Math.round(logs.reduce((acc, log) => acc + (log.duration || 0), 0) / logs.length)}ms`
                          : '0ms'}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-400">Last Active</p>
                      <p className="text-lg font-medium text-gray-100">
                        {logs.length > 0 
                          ? new Date(logs[0].timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project Configuration */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-800">
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <Key className="h-5 w-5 text-amber-400" />
                  Project Configuration
                </h3>
                
                {project.type === 'api_proxy' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm text-gray-400">API Key</label>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-gray-100">
                            {project.securedApiKey ? `${project.securedApiKey.substring(0, 8)}...` : '••••••••'}
                          </p>
                          <button 
                            onClick={() => copyToClipboard(project.securedApiKey)}
                            className="p-1 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded"
                            disabled={!project.securedApiKey}
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to rotate this API key? The old key will be invalidated immediately.')) {
                            rotateApiKey();
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-red-900/50 text-red-400 rounded text-sm"
                        disabled={!project.securedApiKey}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Rotate Key
                      </button>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Base URL</label>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-gray-100 truncate max-w-xs">
                          {project.baseUrl || 'Not configured'}
                        </p>
                        <button 
                          onClick={() => copyToClipboard(project.baseUrl)}
                          className="p-1 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded"
                          disabled={!project.baseUrl}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <button 
                        onClick={() => toggleExpandSection('headers')}
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-2"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'headers' ? 'rotate-180' : ''}`} />
                        <span>Default Headers</span>
                      </button>
                      
                      {expandedSection === 'headers' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <pre className="text-xs bg-gray-800 p-3 rounded-lg overflow-x-auto">
                            {project.headers ? JSON.stringify(project.headers, null, 2) : 'No headers configured'}
                          </pre>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Provider</label>
                      <p className="text-gray-100 font-medium flex items-center gap-2">
                        {project.provider === 'mpesa' ? (
                          <>
                            <Zap className="h-4 w-4 text-green-500" />
                            M-Pesa
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-4 w-4 text-blue-400" />
                            {project.provider ? project.provider.charAt(0).toUpperCase() + project.provider.slice(1) : 'Unknown'}
                          </>
                        )}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Environment</label>
                      <p className="text-gray-100 font-medium">
                        <span className={`text-xs px-2 py-1 rounded-full ${project.environment === 'sandbox' ? 'bg-amber-900/50 text-amber-400' : 'bg-green-900/50 text-green-400'}`}>
                          {project.environment === 'sandbox' ? 'Sandbox' : 'Production'}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Webhook URL</label>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-gray-100 truncate max-w-xs">
                          {project.webhookUrl || 'Not configured'}
                        </p>
                        <button 
                          onClick={() => copyToClipboard(project.webhookUrl)}
                          className="p-1 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded"
                          disabled={!project.webhookUrl}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'logs' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                  <Database className="h-5 w-5 text-cyan-400" />
                  Request Logs
                </h3>
                <div className="text-sm text-gray-400">
                  Showing {Math.min(logsPerPage, currentLogs.length)} of {logs.length} logs
                </div>
              </div>
              
              {logsLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                </div>
              ) : logs.length === 0 ? (
                <div className="bg-gray-800/50 rounded-lg p-8 text-center">
                  <Database className="h-10 w-10 mx-auto text-gray-600 mb-3" />
                  <h4 className="text-lg font-medium text-gray-300 mb-1">
                    No request logs yet
                  </h4>
                  <p className="text-gray-500 mb-4">
                    Your project is ready but hasn't processed any requests yet
                  </p>
                  {project.type === 'api_proxy' && (
                    <button
                      onClick={() => copyToClipboard(project.securedApiKey)}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-900/50 hover:bg-cyan-900 text-cyan-400 rounded-lg mx-auto"
                    >
                      <Copy className="h-4 w-4" />
                      Copy API Key to Test
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                      <div className="overflow-hidden border border-gray-800 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-800">
                          <thead className="bg-gray-900">
                            <tr>
                              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Type
                              </th>
                              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Endpoint
                              </th>
                              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Duration
                              </th>
                              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Event
                              </th>
                              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Message
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {currentLogs.map((log, index) => (
                              <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                                {/* Type */}
                                <td className="px-3 py-4 whitespace-nowrap">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    log.type === 'initiate' ? 'bg-blue-900/50 text-blue-400' :
                                    log.type === 'callback' ? 'bg-purple-900/50 text-purple-400' :
                                    log.type === 'query' ? 'bg-amber-900/50 text-amber-400' :
                                    'bg-gray-800 text-gray-400'
                                  }`}>
                                    {log.type || '--'}
                                  </span>
                                </td>
                                
                                {/* Endpoint */}
                                <td className="px-3 py-4 max-w-[180px] 2xl:max-w-xs truncate">
                                  <div className="flex items-center gap-2">
                                    <LinkIcon className="h-3 w-3 text-gray-500 flex-shrink-0" />
                                    <span className="font-mono text-xs text-gray-300 truncate">
                                      {log.endpoint || '--'}
                                    </span>
                                  </div>
                                </td>
                                
                                {/* Status */}
                                <td className="px-3 py-4 whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(log.status_code)}
                                    <span className={`font-mono text-xs ${
                                      log.status_code >= 200 && log.status_code < 300 ? 'text-green-400' :
                                      log.status_code >= 400 && log.status_code < 500 ? 'text-yellow-400' :
                                      log.status_code >= 500 ? 'text-red-400' : 'text-blue-400'
                                    }`}>
                                      {log.status_code || '--'}
                                    </span>
                                  </div>
                                </td>
                                
                                {/* Duration */}
                                <td className="px-3 py-4 whitespace-nowrap">
                                  <span className="font-mono text-xs text-gray-300">
                                    {log.duration_ms ? `${log.duration_ms}ms` : '--'}
                                  </span>
                                </td>
                                
                                {/* Event */}
                                <td className="px-3 py-4 whitespace-nowrap">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    log.event === 'success' ? 'bg-green-900/50 text-green-400' :
                                    log.event === 'error' ? 'bg-red-900/50 text-red-400' :
                                    log.event === 'pending' ? 'bg-amber-900/50 text-amber-400' :
                                    'bg-gray-800 text-gray-400'
                                  }`}>
                                    {log.event || '--'}
                                  </span>
                                </td>
                                
                                {/* Message */}
                                <td className="px-3 py-4 max-w-[200px] 2xl:max-w-md">
                                  <div className="text-xs text-gray-400 truncate" title={log.message}>
                                    {log.message || '--'}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  {/* Logs pagination */}
                  {totalLogPages > 1 && (
                    <div className="flex justify-center mt-6">
                      <nav className="flex items-center gap-2">
                        <button
                          onClick={() => paginateLogs(Math.max(1, currentLogsPage - 1))}
                          disabled={currentLogsPage === 1}
                          className="p-2 rounded-md border border-gray-800 bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>

                        {Array.from({ length: totalLogPages }, (_, i) => i + 1).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginateLogs(number)}
                            className={`w-10 h-10 rounded-md flex items-center justify-center ${currentLogsPage === number ? 'bg-cyan-600 text-white' : 'border border-gray-800 bg-gray-900 hover:bg-gray-800'}`}
                          >
                            {number}
                          </button>
                        ))}

                        <button
                          onClick={() => paginateLogs(Math.min(totalLogPages, currentLogsPage + 1))}
                          disabled={currentLogsPage === totalLogPages}
                          className="p-2 rounded-md border border-gray-800 bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-6 flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-400" />
                Project Settings
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                  <h4 className="text-md font-medium text-gray-100 mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-400" />
                    Security
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-300">ZapStack Key</p>
                        <p className="text-xs text-gray-500">
                          Used for administrative actions on this project
                        </p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(project.zapStackKey)}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                        disabled={!project.zapStackKey}
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </button>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-sm font-medium text-gray-300 mb-2">Danger Zone</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Delete this project</p>
                          <p className="text-xs text-gray-500">
                            This action cannot be undone. All project data will be permanently deleted.
                          </p>
                        </div>
                        <button 
                          onClick={() => setShowDeleteConfirm(true)}
                          className="flex items-center gap-2 px-3 py-1 bg-red-900/50 hover:bg-red-900 text-red-400 rounded text-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Project
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                  <h4 className="text-md font-medium text-gray-100 mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-cyan-400" />
                    Project Information
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Project ID</label>
                      <div className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded border border-gray-700">
                        <p className="font-mono text-sm text-gray-300 truncate">
                          {project.id}
                        </p>
                        <button 
                          onClick={() => copyToClipboard(project.id)}
                          className="p-1 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Created At</label>
                      <div className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded border border-gray-700">
                        <p className="text-sm text-gray-300">
                          {new Date(project.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProjectPage;