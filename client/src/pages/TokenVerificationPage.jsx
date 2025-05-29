import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, CheckCircle, ArrowRight, ChevronRight, Cpu, Code, Database, Server, Wifi, Cctv, Rocket } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const TokenVerificationPage = () => {
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (token === 'ZAP123') {
        setIsVerified(true);
        toast.success('Token verified successfully!');
      } else {
        toast.error('Invalid token. Please try again.');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

        {isVerified ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 mb-6"
            >
              <CheckCircle className="h-10 w-10 text-green-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-400 mb-3">
              Token Verified Successfully!
            </h3>
            <p className="text-gray-400 mb-8">
              You now have full access to all premium features.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/dashboard')}
              className="w-full flex justify-center items-center py-3.5 px-6 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/50 transition-all duration-200 shadow-lg"
              style={{
                boxShadow: '0 4px 15px -3px rgba(34, 211, 238, 0.4)'
              }}
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 mb-4"
              >
                <Shield className="h-8 w-8 text-cyan-400" />
              </motion.div>
              <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Secure Verification
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Enter your access token to continue
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Verification Token
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="token"
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-gray-800/70 transition-all duration-200 shadow-sm"
                    placeholder="Enter your token"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Check your email for the verification token
                </p>
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
                      Verifying...
                      <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      Verify Token
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TokenVerificationPage;