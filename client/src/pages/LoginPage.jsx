import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ChevronRight, Key, Zap, Cpu, Code, Database, Server, Wifi, Cctv, Rocket } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }

      // Generate random verification token for demo
      const verificationToken = `ZAP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      toast.success(
        <div>
          <p className="font-medium">Login successful!</p>
          <p className="text-sm mt-1">A verification token has been sent to {email}</p>
          <div className="mt-2 p-2 bg-gray-800 rounded-md text-xs font-mono">
            <span className="text-gray-400">Demo token: </span>
            <span className="text-cyan-400">{verificationToken}</span>
          </div>
        </div>,
        { autoClose: 8000 }
      );
      
      navigate('/dashboard');
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setSocialLoading(provider);
    
    // Simulate social login
    setTimeout(() => {
      setSocialLoading(null);
      toast.success(`Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);
      navigate('/dashboard');
    }, 2000);
  };

  // Floating tech icons
  const techIcons = [
    { icon: <Cpu size={24} />, color: 'text-purple-400' },
    { icon: <Code size={24} />, color: 'text-blue-400' },
    { icon: <Database size={24} />, color: 'text-emerald-400' },
    { icon: <Server size={24} />, color: 'text-amber-400' },
    { icon: <Wifi size={24} />, color: 'text-cyan-400' },
    { icon: <Cctv size={24} />, color: 'text-red-400' },
    { icon: <Rocket size={24} />, color: 'text-pink-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Space Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              opacity: [0, Math.random() * 0.5 + 0.3, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 5
            }}
            className={`absolute rounded-full ${Math.random() > 0.5 ? 'bg-cyan-400/20' : 'bg-purple-400/20'}`}
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`
            }}
          />
        ))}
      </div>

      {/* Floating Tech Icons */}
      {techIcons.map((tech, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 10
          }}
          className={`absolute ${tech.color} opacity-20`}
        >
          {tech.icon}
        </motion.div>
      ))}

      {/* Glow Effects */}
      <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full filter blur-[150px]"></div>
      <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full filter blur-[150px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden p-8 relative z-10"
        style={{
          boxShadow: '0 25px 50px -12px rgba(34, 211, 238, 0.2)',
          borderImage: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(124, 58, 237, 0.3)) 1'
        }}
      >
        {/* Card Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl filter blur-xl opacity-30 pointer-events-none"></div>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 mb-4"
          >
            <Zap className="h-8 w-8 text-cyan-400" />
          </motion.div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Secure Login
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Authenticate to access your dashboard
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('github')}
            disabled={socialLoading}
            className={`flex items-center justify-center py-2 px-4 rounded-xl border border-gray-700/50 text-sm font-medium transition-all ${
              socialLoading === 'github' ? 'bg-gray-800/50' : 'bg-gray-800/30 hover:bg-gray-800/50'
            }`}
          >
            {socialLoading === 'github' ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('google')}
            disabled={socialLoading}
            className={`flex items-center justify-center py-2 px-4 rounded-xl border border-gray-700/50 text-sm font-medium transition-all ${
              socialLoading === 'google' ? 'bg-gray-800/50' : 'bg-gray-800/30 hover:bg-gray-800/50'
            }`}
          >
            {socialLoading === 'google' ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <FcGoogle className="h-5 w-5" />
                <span className="sr-only">Google</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('sso')}
            disabled={socialLoading}
            className={`flex items-center justify-center py-2 px-4 rounded-xl border border-gray-700/50 text-sm font-medium transition-all ${
              socialLoading === 'sso' ? 'bg-gray-800/50' : 'bg-gray-800/30 hover:bg-gray-800/50'
            }`}
          >
            {socialLoading === 'sso' ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <Key className="h-5 w-5" />
                <span className="sr-only">SSO</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900/50 text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-gray-800/70 transition-all duration-200 shadow-sm"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-gray-800/70 transition-all duration-200 shadow-sm"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-gray-800/50 border-gray-700/50 rounded text-cyan-500 focus:ring-cyan-500/50 transition-all"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <Link 
              to="/forgot-password" 
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ x: -2 }}
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 border border-gray-700/50 shadow-sm text-sm font-medium rounded-xl text-gray-300 bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/50 transition-all"
            >
              <ChevronRight className="h-4 w-4 transform rotate-180 mr-2" />
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/50 transition-all duration-200"
              style={{
                boxShadow: '0 4px 15px -3px rgba(34, 211, 238, 0.3)'
              }}
            >
              {isLoading ? (
                <>
                  Signing in...
                  <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;