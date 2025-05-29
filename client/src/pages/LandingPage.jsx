import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import { useInView } from 'react-intersection-observer';
import { 
  Zap, Shield, Lock, Key, RefreshCw, Code, Server, CreditCard,
  Globe, Link as LinkIcon, BarChart2, Settings, GitBranch, Activity,
  MessageSquare, Smartphone, ShoppingCart, Heart, Github, Twitter, 
  MessageCircle, Menu, X, ChevronDown, Rocket, Cpu, Database, 
  Terminal, Layers, ShieldCheck, Clock, Hash, GitPullRequest, Copy,
  ArrowRight, ChevronRight, Circle, Sparkles
} from 'lucide-react';

// Particle Background Component
const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            x: [particle.x, particle.x + (Math.random() * 20 - 10)],
            y: [particle.y, particle.y + (Math.random() * 20 - 10)]
          }}
          transition={{ 
            delay: particle.delay,
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        />
      ))}
    </div>
  );
};

// Animated Grid Component
const AnimatedGrid = () => {
  const lines = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    direction: i % 2 === 0 ? 'horizontal' : 'vertical',
    position: i % 2 === 0 ? `${(i / 2) * 10}%` : `${((i - 1) / 2) * 10}%`,
    delay: i * 0.1
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, [line.direction === 'horizontal' ? 'scaleX' : 'scaleY']: 0 }}
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            [line.direction === 'horizontal' ? 'scaleX' : 'scaleY']: 1
          }}
          transition={{ 
            delay: line.delay,
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`absolute bg-gradient-to-r from-cyan-400/10 to-purple-500/10 ${line.direction === 'horizontal' ? 'h-px w-full left-0' : 'w-px h-full top-0'}`}
          style={{
            [line.direction === 'horizontal' ? 'top' : 'left']: line.position
          }}
        />
      ))}
    </div>
  );
};

// Scroll Indicator
const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0, 1, 0],
        y: [0, 10, 20]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity
      }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
    >
      <span className="text-xs text-cyan-400 mb-1">Scroll</span>
      <div className="w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent"></div>
    </motion.div>
  );
};

// Animated Feature Card
const FeatureCard = ({ icon, title, desc, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)"
      }}
      className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-all backdrop-blur-sm"
    >
      <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit mb-4 text-cyan-400">
        {icon}
      </div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </motion.div>
  );
};

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Data arrays
  const paymentMethods = [
    { name: 'M-Pesa', icon: <Zap className="text-green-500" />, color: 'bg-green-500/10', tagline: 'Secure mobile payments' },
    { name: 'Stripe', icon: <CreditCard className="text-blue-500" />, color: 'bg-blue-500/10', tagline: 'Global card processing' },
    { name: 'PayPal', icon: <CreditCard className="text-yellow-500" />, color: 'bg-yellow-500/10', tagline: 'Easy online payments' },
    { name: 'Paystack', icon: <CreditCard className="text-purple-500" />, color: 'bg-purple-500/10', tagline: 'Africa payments leader' },
    { name: 'Google Pay', icon: <CreditCard className="text-red-500" />, color: 'bg-red-500/10', tagline: 'Fast checkout' },
    { name: 'Visa/MC', icon: <CreditCard className="text-indigo-500" />, color: 'bg-indigo-500/10', tagline: 'Global card support' }
  ];

  const features = [
    { icon: <Server />, title: 'Universal API Proxy', desc: 'Connect any REST, GraphQL, or SOAP endpoint with zero client-side exposure' },
    { icon: <Key />, title: 'API Key Protection', desc: 'Never expose your API keys - we rotate and encrypt them automatically' },
    { icon: <LinkIcon />, title: 'Smart Webhook Routing', desc: 'Validate, transform and route webhooks to multiple endpoints' },
    { icon: <BarChart2 />, title: 'Real-Time Analytics', desc: 'Monitor API usage, latency, and errors with beautiful dashboards' },
    { icon: <Activity />, title: 'Adaptive Rate Limiting', desc: 'Smart throttling that protects your backend from traffic spikes' },
    { icon: <RefreshCw />, title: 'Intelligent Retry System', desc: 'Automatic retries with exponential backoff for failed requests' },
    { icon: <CreditCard />, title: 'Payment Gateway', desc: 'Unified API for multiple payment processors with automatic reconciliation' },
    { icon: <Settings />, title: 'Developer Dashboard', desc: 'Beautiful UI with dark mode that developers actually enjoy using' },
    { icon: <GitBranch />, title: 'Multi-Environment', desc: 'Seamless test/stage/prod separation with environment variables' },
    { icon: <Database />, title: 'Request Logging', desc: 'Full request/response logging with search and filtering capabilities' },
    { icon: <Clock />, title: 'Latency Optimization', desc: 'Global edge caching and connection pooling for faster responses' },
    { icon: <ShieldCheck />, title: 'Compliance Ready', desc: 'GDPR, PCI-DSS, SOC2 compliance out of the box' }
  ];

  const developerBenefits = [
    {
      icon: <CreditCard className="text-purple-400" />,
      title: "Payment Integrations Made Simple",
      benefits: [
        "Single API for all major payment processors",
        "Automatic transaction reconciliation",
        "Webhook handling for payment notifications",
        "Unified reporting across all payment methods"
      ]
    },
    {
      icon: <Key className="text-cyan-400" />,
      title: "API Key Security",
      benefits: [
        "Automatic key rotation and encryption",
        "Environment-based key management",
        "Detailed access logs for all API calls",
        "Fine-grained permission controls"
      ]
    },
    {
      icon: <Server className="text-blue-400" />,
      title: "Third-Party API Management",
      benefits: [
        "Standardized interface for all external APIs",
        "Automatic retries for failed requests",
        "Request/response transformation",
        "Performance monitoring and analytics"
      ]
    }
  ];

  const codeExamples = [
    {
      language: "JavaScript",
      icon: <Code className="text-yellow-400" />,
      code: `// Simple API call through ZapStack
fetch('https://api.zapstack.com/proxy/your-endpoint', {
  headers: {
    'Authorization': 'Bearer YOUR_ZAPSTACK_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`
    },
    {
      language: "Python",
      icon: <Code className="text-blue-400" />,
      code: `# Python example with requests
import requests

headers = {
    'Authorization': 'Bearer YOUR_ZAPSTACK_KEY'
}

response = requests.get(
    'https://api.zapstack.com/proxy/your-endpoint',
    headers=headers
)

print(response.json())`
    },
    {
      language: "cURL",
      icon: <Terminal className="text-green-400" />,
      code: `# Direct cURL example
curl -X GET \\
  -H "Authorization: Bearer YOUR_ZAPSTACK_KEY" \\
  https://api.zapstack.com/proxy/your-endpoint`
    }
  ];

  // Animated tabs for code examples
  const CodeTabs = () => {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-700">
          {codeExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${activeTab === index ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
            >
              {example.icon}
              {example.language}
            </button>
          ))}
        </div>
        <div className="p-4 bg-gray-900/50">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-gray-300 overflow-x-auto"
            >
              {codeExamples[activeTab].code}
            </motion.pre>
          </AnimatePresence>
          <button className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            <Copy className="h-3 w-3" />
            Copy to clipboard
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-900/80 border-b border-gray-800 z-50 backdrop-blur-md">
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="h-8 w-8 text-cyan-400" />
                </motion.div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ZapStack</span>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium hover:bg-gray-800/50 rounded-md transition-all">Features</a>
                  <a href="#developers" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium hover:bg-gray-800/50 rounded-md transition-all">For Developers</a>
                  <a href="#pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium hover:bg-gray-800/50 rounded-md transition-all">Pricing</a>
                <Link to="/docs"> <button className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all">Docs</button></Link>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/auth/zap-in"> <button className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all">Sign in</button></Link>
                <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-sm font-medium text-white rounded-md hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Get started
                </motion.button>
                </Link>
              </div>
            </div>

            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-800/50"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 border-t border-gray-800 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all">Features</a>
              <a href="#developers" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all">For Developers</a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all">Pricing</a>
                <Link to="/docs"> <button className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all">Docs</button></Link>
              <div className="pt-4 border-t border-gray-800">
                <Link to="/auth/zap-in"> <button className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all">Sign in</button></Link>
                <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-sm font-medium text-white rounded-md hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Get started
                </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-24 px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        <ParticleBackground />
        <AnimatedGrid />
        
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-6"
            >
              <Sparkles className="h-4 w-4 text-cyan-400 mr-2" />
              <span className="text-sm text-gray-300">The future of API integration is here</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              <span className="inline-block">Secure.</span>{' '}
              <span className="inline-block">Scalable.</span>{' '}
              <span className="inline-block">Seamless.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-xl leading-8 text-gray-400 max-w-4xl mx-auto"
            >
              ZapStack revolutionizes API integration with military-grade security, unified payment processing, and effortless third-party connectivity — all in one powerful platform.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#signup"
                className="relative rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all group overflow-hidden"
              >
                <span className="relative z-10">Start Building Free</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </motion.a>
              
              <motion.a 
                whileHover={{ x: 5 }}
                href="#demo"
                className="text-sm font-semibold leading-6 text-gray-400 hover:text-white flex items-center justify-center gap-1 group"
              >
                <span className="relative">
                  Watch Demo
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </span>
                <ChevronRight className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* API Flow Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 lg:mt-24"
          >
            <div className="relative rounded-2xl bg-gray-800/30 p-8 border border-gray-700 shadow-2xl backdrop-blur-lg overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-5"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                  LIVE CONNECTION
                </div>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Client App */}
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 flex flex-col items-center shadow-lg"
                >
                  <div className="relative mb-4">
                    <Smartphone className="h-10 w-10 text-cyan-400" />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-400">Client Application</span>
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    <p className="text-cyan-400 font-mono">fetch('zapstack-api')</p>
                    <p className="mt-1">Sends request with temporary token</p>
                  </div>
                </motion.div>
                
                {/* ZapStack Processing */}
                <motion.div 
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6 rounded-xl border border-cyan-400/30 flex flex-col items-center shadow-lg shadow-cyan-400/10 relative overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full filter blur-xl"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-4">
                      <Zap className="h-8 w-8 text-cyan-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-400">ZapStack Gateway</span>
                    <div className="mt-4 text-xs text-gray-300 text-center space-y-1">
                      <p className="flex items-center gap-1"><Circle className="h-2 w-2 text-green-400" /> Validates request</p>
                      <p className="flex items-center gap-1"><Circle className="h-2 w-2 text-green-400" /> Rotates API keys</p>
                      <p className="flex items-center gap-1"><Circle className="h-2 w-2 text-green-400" /> Processes payments</p>
                      <p className="flex items-center gap-1"><Circle className="h-2 w-2 text-green-400" /> Routes to backend</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Backend Services */}
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ 
                    y: [0, 15, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 flex flex-col items-center shadow-lg"
                >
                  <div className="flex space-x-4 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Server className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <CreditCard className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-400">Your Backend & Payments</span>
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    <p className="text-cyan-400 font-mono">200 OK</p>
                    <p className="mt-1">Receives secure request with rotated keys</p>
                  </div>
                </motion.div>
              </div>

              {/* Flow Arrows */}
              <div className="hidden lg:flex justify-between items-center px-8 mt-8">
                <motion.div
                  animate={{ 
                    x: [0, 10, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity
                  }}
                >
                  <ArrowRight className="h-8 w-8 text-cyan-400" />
                </motion.div>
                <motion.div
                  animate={{ 
                    x: [0, 10, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                >
                  <ArrowRight className="h-8 w-8 text-cyan-400" />
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-center text-sm text-gray-400 relative z-10"
              >
                <p>Your API and payment keys stay protected while your app works seamlessly</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <ScrollIndicator />
      </section>

      {/* Developer Benefits Section */}
      <section id="developers" className="py-12 sm:py-24 bg-gradient-to-b from-gray-900/50 to-gray-950 px-6 lg:px-8 relative overflow-hidden">
        <AnimatedGrid />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-6"
            >
              <Code className="h-4 w-4 text-cyan-400 mr-2" />
              <span className="text-sm text-gray-300">Developer Experience First</span>
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Build Faster. Ship Sooner.
            </h2>
            <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
              ZapStack eliminates integration headaches so you can focus on building great products
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {developerBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 filter blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {benefit.benefits.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + (i * 0.1) }}
                        className="flex items-start gap-3 text-gray-400"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="h-5 w-5 rounded-full bg-cyan-400/10 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                          </div>
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-12 sm:py-24 px-6 lg:px-8 relative overflow-hidden">
        <ParticleBackground />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Developer-Friendly Integration
            </h2>
            <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
              Get started in minutes with code snippets for every popular language
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <CodeTabs />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-24 bg-gradient-to-b from-gray-950 to-gray-900/50 px-6 lg:px-8 relative overflow-hidden">
        <AnimatedGrid />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-6"
            >
              <Zap className="h-4 w-4 text-cyan-400 mr-2" />
              <span className="text-sm text-gray-300">Enterprise-Grade Features</span>
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Powerful Capabilities
            </h2>
            <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
              All the tools you need to build, secure, and scale your API integrations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-12 sm:py-24 px-6 lg:px-8 relative overflow-hidden">
        <ParticleBackground />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Unified Payment Processing
            </h2>
            <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
              Accept payments globally through a single API integration
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 10px 25px -5px ${method.color.replace('bg-', 'rgba(').replace('/10', ', 0.2)').replace(/(\w+)-(\d+)/g, (match, color, num) => {
                    const colors = {
                      green: '74, 222, 128',
                      blue: '96, 165, 250',
                      yellow: '250, 204, 21',
                      purple: '192, 132, 252',
                      red: '248, 113, 113',
                      indigo: '129, 140, 248'
                    };
                    return colors[color] || '255, 255, 255';
                  })}`
                }}
                className={`${method.color} p-4 rounded-xl border border-gray-700 flex flex-col items-center backdrop-blur-sm transition-all`}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {method.icon}
                </motion.div>
                <h3 className="font-medium mt-3">{method.name}</h3>
                <p className="text-xs text-gray-400 mt-1 text-center">{method.tagline}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gray-900/50 rounded-3xl p-8 sm:p-12 border border-gray-700 shadow-2xl backdrop-blur-lg overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6"
            >
              Ready to Transform Your API Strategy?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of developers who trust ZapStack to handle their API security, payment processing, and third-party integrations.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#signup"
                className="relative rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all group overflow-hidden"
              >
                <span className="relative z-10">Get Started Free</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </motion.a>
              
              <motion.a
                whileHover={{ x: 5 }}
                href="#demo"
                className="relative rounded-lg bg-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-all group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Watch Demo</span>
                  <ChevronRight className="h-4 w-4" />
                </span>
                <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/95 border-t border-gray-800 px-6 lg:px-8 py-12 backdrop-blur-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-8 w-8 text-cyan-400" />
              </motion.div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ZapStack</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              The complete API integration platform for modern developers.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a 
                whileHover={{ y: -3 }}
                href="#" 
                className="text-gray-400 hover:text-white transition-all"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="#" 
                className="text-gray-400 hover:text-white transition-all"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="#" 
                className="text-gray-400 hover:text-white transition-all"
              >
                <MessageCircle className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#features" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Features</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#pricing" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Pricing</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#integrations" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Integrations</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#status" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Status</span>
                </motion.a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#docs" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Documentation</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#tutorials" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Tutorials</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#blog" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Blog</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#support" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Support</span>
                </motion.a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#about" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>About</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#careers" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Careers</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#contact" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Contact</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#legal" 
                  className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                  <span>Legal</span>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ZapStack. All rights reserved.
          </p>
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="mt-4 md:mt-0 text-sm text-gray-400 flex items-center"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-red-400 mr-1" />
            </motion.span>
            Built with love for developers worldwide
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
