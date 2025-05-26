import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, RotateCw, ChevronDown, Plus, Search, Key, Globe, 
  Headphones, Code, Calendar, Shield, Database, Cpu, CreditCard,
  Server, Link as LinkIcon, Lock, RefreshCw, Activity, Zap, Box, 
  Loader2, Settings, Trash2, Edit, ExternalLink, Clock, BarChart2,
  AlertCircle, CheckCircle, XCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import "../index.css";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const [showRotateConfirm, setShowRotateConfirm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

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

  // Fetch projects from Express backend
  useEffect(() => {
    const toastId = 'projects-load-error';
    const source = axios.CancelToken.source();
    
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3500/api/fetch/projects', {
          cancelToken: source.token
        });
        setProjects(response.data.projects || []);
        toast.dismiss(toastId);
      } catch (error) {
        if (!axios.isCancel(error)) {
          toast.error('Failed to load projects', { toastId });
          console.error('Error fetching projects:', error);
          setProjects([]);
        }
      } finally {
        if (!source.token.reason) {
          setLoading(false);
        }
      }
    };
    
    fetchProjects();

    return () => {
      source.cancel('Component unmounted');
      toast.dismiss(toastId);
    };
  }, []);

  const handleCreateProject = () => {
    navigate('/create/new');
  };

  const filteredProjects = projects.filter(project => {
    const nameMatch = project?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
    const typeMatch = activeTab === 'all' || project?.type === activeTab;
    return nameMatch && typeMatch;
  });

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleRotateClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowRotateConfirm(true);
  };

  const rotateApiKey = async () => {
    const toastId = 'rotate-key-error';
    try {
      const response = await axios.post(`http://localhost:3500/api/projects/${selectedProjectId}/rotate-key`);
      toast.success('API key rotated successfully!');
      
      setProjects(prevProjects => prevProjects.map(project => {
        if (project.id === selectedProjectId) {
          return { ...project, api_key: response.data.newKey };
        }
        return project;
      }));
    } catch (error) {
      toast.error('Failed to rotate API key', { toastId });
      console.error('Error rotating key:', error);
    } finally {
      setShowRotateConfirm(false);
    }
  };

  const toggleExpandCard = (projectId) => {
    setExpandedCard(expandedCard === projectId ? null : projectId);
  };

  const navigateToManage = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative">
      {/* YouTube-style page loading indicator */}
      {showPageLoader && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pageLoader"></div>
        </div>
      )}

      {/* Rotate Key Confirmation Modal */}
      <AnimatePresence>
        {showRotateConfirm && (
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
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Rotate API Key
              </h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to rotate this API key? The old key will be invalidated immediately and any applications using it will stop working.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowRotateConfirm(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={rotateApiKey}
                  className="px-4 py-2 bg-yellow-900/50 hover:bg-yellow-900 text-yellow-400 rounded-lg transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Rotate Key
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <div className="p-4 md:p-6 pt-20">
        {/* Header - Removed mx-auto container */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pt-12 md:pt-16 lg:pt-20">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
              <Zap className="h-8 w-8" />
              Your Projects
            </h1>
            <p className="text-gray-400 mt-1 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Manage and monitor your API and payment integrations
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              onClick={handleCreateProject}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          {['all', 'api_proxy', 'payments'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm relative flex items-center gap-1 ${activeTab === tab ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab === 'api_proxy' ? (
                <Server className="h-4 w-4" />
              ) : tab === 'payments' ? (
                <CreditCard className="h-4 w-4" />
              ) : (
                <Box className="h-4 w-4" />
              )}
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Projects
              {activeTab === tab && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-800 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6 mb-3"></div>
                  <div className="h-4 bg-gray-800 rounded w-4/5 mb-6"></div>
                  <div className="h-8 bg-gray-800 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : currentProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {currentProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transition-shadow ${expandedCard === project.id ? 'ring-2 ring-cyan-400/30' : ''}`}
                  >
                    {project.type === 'api_proxy' ? (
                      <ApiProjectCard 
                        project={project} 
                        expanded={expandedCard === project.id}
                        onToggleExpand={() => toggleExpandCard(project.id)}
                        onCopy={copyToClipboard}
                        onRotateKey={handleRotateClick}
                        onManage={() => navigateToManage(project.id)}
                      />
                    ) : (
                      <PaymentProjectCard 
                        project={project}
                        onCopy={copyToClipboard}
                        onManage={() => navigateToManage(project.id)}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border border-gray-800 bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded-md flex items-center justify-center ${currentPage === number ? 'bg-cyan-600 text-white' : 'border border-gray-800 bg-gray-900 hover:bg-gray-800'}`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-gray-800 bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 max-w-md">
              <Code className="h-10 w-10 mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-300 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery 
                  ? 'Try adjusting your search query'
                  : activeTab === 'all'
                    ? 'You currently have no projects'
                    : `You have no ${activeTab} projects`}
              </p>
              <button 
                onClick={handleCreateProject}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                Create your first project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ApiProjectCard = ({ project, expanded, onToggleExpand, onCopy, onRotateKey, onManage }) => {
  if (!project) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-cyan-400" />
          {project.name || 'Unnamed Project'}
        </h3>
        <span className="text-xs px-2 py-1 bg-gray-800 text-cyan-400 rounded-full flex items-center gap-1">
          <Server className="h-3 w-3" />
          API
        </span>
      </div>
      
      <div className="space-y-3 flex-grow">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-400">API Key:</span>
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => project.api_key && onCopy(project.securedApiKey)}
              className="font-mono text-sm bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
              disabled={!project.api_key}
            >
              {project.api_key ? `${project.api_key.substring(0, 8)}...` : '••••••••'}
            </button>
            <button 
              onClick={() => project.api_key && onCopy(project.api_key)}
              className="p-1 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded"
              title="Copy API Key"
              disabled={!project.api_key}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-400">Base URL:</span>
          <div className="flex items-center ml-auto">
            <button
              onClick={() => project.baseUrl && onCopy(project.baseUrl)}
              className="font-mono text-sm text-gray-300 truncate max-w-[120px] hover:bg-gray-800 px-2 py-1 rounded"
              disabled={!project.baseUrl}
            >
              {project.baseUrl || 'Not configured'}
            </button>
            <button 
              onClick={() => project.baseUrl && onCopy(project.baseUrl)}
              className="p-1 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded"
              title="Copy URL"
              disabled={!project.baseUrl}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="pt-2">
          <button 
            onClick={() => onToggleExpand(project.id)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300"
            disabled={!project.headers}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            <span>Default Headers</span>
          </button>
          
          {expanded && project.headers && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 bg-gray-900/50 rounded-lg p-3 overflow-hidden"
            >
              <pre className="text-xs text-gray-400 overflow-x-auto">
                {JSON.stringify(project.headers, null, 2)}
              </pre>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>
            {project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'Unknown date'}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => project.zapStackKey && onCopy(project.zapStackKey)}
            className="text-xs flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded"
            title="Copy ZapStack Key"
            disabled={!project.zapStackKey}
          >
            <Shield className="h-3 w-3" />
            <span>ZSK</span>
            <Copy className="h-3 w-3" />
          </button>
          
          <button 
            onClick={() => onRotateKey(project.id)}
            className="text-xs flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-red-900/50 text-red-400 rounded"
            title="Rotate API Key"
            disabled={!project.api_key}
          >
            <RefreshCw className="h-3 w-3" />
            <span>Rotate</span>
          </button>

          <button 
            onClick={() => onManage(project.id)}
            className="text-xs flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-cyan-900/50 text-cyan-400 rounded"
            title="Manage Project"
          >
            <Settings className="h-3 w-3" />
            <span>Manage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentProjectCard = ({ project, onCopy, onManage }) => {
  if (!project) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-400" />
          {project.name || 'Unnamed Project'}
        </h3>
        <span className="text-xs px-2 py-1 bg-gray-800 text-purple-400 rounded-full flex items-center gap-1">
          <CreditCard className="h-3 w-3" />
          Payments
        </span>
      </div>
      
      <div className="space-y-3 flex-grow">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Provider:</span>
          <span className="ml-auto text-sm font-medium text-gray-200 flex items-center gap-1">
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
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Environment:</span>
          <span className={`ml-auto text-xs px-2 py-1 rounded-full flex items-center gap-1 ${project.environment === 'sandbox' ? 'bg-amber-900/50 text-amber-400' : 'bg-green-900/50 text-green-400'}`}>
            {project.environment === 'sandbox' ? (
              <>
                <Lock className="h-3 w-3" />
                Sandbox
              </>
            ) : (
              <>
                <Globe className="h-3 w-3" />
                Production
              </>
            )}
          </span>
        </div>
        
        <div className="pt-1">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-400">Webhook URL:</span>
            <div className="flex items-center ml-auto">
              <button
                onClick={() => project.webhookUrl && onCopy(project.webhookUrl)}
                className="font-mono text-sm text-gray-300 truncate max-w-[120px] hover:bg-gray-800 px-2 py-1 rounded"
                disabled={!project.webhookUrl}
              >
                {project.webhookUrl || 'Not configured'}
              </button>
              <button 
                onClick={() => project.webhookUrl && onCopy(project.webhookUrl)}
                className="p-1 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded"
                title="Copy Webhook URL"
                disabled={!project.webhookUrl}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>
            {project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'Unknown date'}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => project.zapStackKey && onCopy(project.zapStackKey)}
            className="text-xs flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded"
            title="Copy ZapStack Key"
            disabled={!project.zapStackKey}
          >
            <Shield className="h-3 w-3" />
            <span>ZSK</span>
            <Copy className="h-3 w-3" />
          </button>

          <button 
            onClick={() => onManage(project.id)}
            className="text-xs flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-purple-900/50 text-purple-400 rounded"
            title="Manage Project"
          >
            <Settings className="h-3 w-3" />
            <span>Manage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;