import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, Lock, Key, RefreshCw, Code, Server, CreditCard,
  Globe, Link as LinkIcon, BarChart2, Settings, GitBranch, Activity,
  MessageSquare, Smartphone, ShoppingCart, Heart, Github, Twitter, 
  MessageCircle, Menu, X, ChevronDown, Rocket, Cpu, Database, 
  Terminal, Layers, ShieldCheck, Clock, Hash, GitPullRequest, Copy,
  ArrowRight, ChevronRight
} from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="bg-gray-950 text-gray-100">
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-900 border-b border-gray-800 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Zap className="h-8 w-8 text-cyan-400" />
                <span className="ml-2 text-xl font-bold">ZapStack</span>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Features</a>
                  <a href="#developers" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">For Developers</a>
                  <a href="#pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Pricing</a>
                  <a href="#docs" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Docs</a>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <a href="#login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white">Sign in</a>
                <a href="#signup" className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity">
                  Get started
                </a>
              </div>
            </div>

            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
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
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Features</a>
              <a href="#developers" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">For Developers</a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Pricing</a>
              <a href="#docs" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Docs</a>
              <div className="pt-4 border-t border-gray-800">
                <a href="#login" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Sign in</a>
                <a href="#signup" className="block w-full px-3 py-2 mt-2 text-base font-medium text-center text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:opacity-90 transition-opacity">
                  Get started
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute left-1/2 top-1/2 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        </motion.div>
        
        <div className="relative text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            The Complete API Integration Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-xl leading-8 text-gray-400 max-w-3xl mx-auto"
          >
            Secure your API keys, simplify payment integrations, and accelerate third-party API calls with one unified platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#signup"
              className="rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity text-center w-full sm:w-auto"
            >
              Start Building Free
            </motion.a>
            <motion.a 
              whileHover={{ x: 5 }}
              href="#demo"
              className="text-sm font-semibold leading-6 text-gray-400 hover:text-white flex items-center justify-center gap-1 w-full sm:w-auto"
            >
              Watch Demo <ChevronRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
        
        {/* API Flow Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="relative rounded-xl bg-gray-800/50 p-6 border border-gray-800 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-400">Secure API & Payment Flow</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Client App */}
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  transition: { repeat: Infinity, duration: 3 }
                }}
                className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex flex-col items-center"
              >
                <Smartphone className="h-8 w-8 text-cyan-400" />
                <span className="text-xs mt-2 text-gray-400">Client App</span>
                <div className="mt-3 text-xs text-gray-500">Sends request with ZapStack key</div>
              </motion.div>
              
              {/* ZapStack Processing */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  transition: { repeat: Infinity, duration: 3, delay: 0.5 }
                }}
                className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-4 rounded-lg border border-cyan-400/30 flex flex-col items-center"
              >
                <Zap className="h-8 w-8 text-cyan-400" />
                <span className="text-xs mt-2 text-gray-400">ZapStack</span>
                <div className="mt-3 text-xs text-gray-300 text-center">
                  <p>• Validates request</p>
                  <p>• Rotates API keys</p>
                  <p>• Processes payments</p>
                  <p>• Routes to backend</p>
                </div>
              </motion.div>
              
              {/* Backend Services */}
              <motion.div 
                animate={{ 
                  y: [0, 10, 0],
                  transition: { repeat: Infinity, duration: 3, delay: 1 }
                }}
                className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex flex-col items-center"
              >
                <div className="flex space-x-2">
                  <Server className="h-8 w-8 text-purple-400" />
                  <CreditCard className="h-8 w-8 text-blue-400" />
                </div>
                <span className="text-xs mt-2 text-gray-400">Your API & Payment Processors</span>
                <div className="mt-3 text-xs text-gray-500">Receives secure request with rotated keys</div>
              </motion.div>
            </div>

            {/* Flow Arrows */}
            <div className="hidden md:flex justify-between items-center px-4 mt-4">
              <motion.div
                animate={{ 
                  x: [0, 10, 0],
                  transition: { repeat: Infinity, duration: 3 }
                }}
              >
                <ArrowRight className="h-6 w-6 text-cyan-400" />
              </motion.div>
              <motion.div
                animate={{ 
                  x: [0, 10, 0],
                  transition: { repeat: Infinity, duration: 3, delay: 0.5 }
                }}
              >
                <ArrowRight className="h-6 w-6 text-cyan-400" />
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center text-sm text-gray-400"
            >
              <p>Your API and payment keys stay protected while your app works seamlessly</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Developer Benefits Section */}
      <section id="developers" className="py-12 sm:py-24 bg-gray-900/50 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Developer-Centric Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-gray-400 max-w-3xl mx-auto"
          >
            Everything you need to build secure, reliable integrations faster
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {developerBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 p-8 rounded-xl border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-900/50">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </div>
              <ul className="space-y-3">
                {benefit.benefits.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    className="flex items-start gap-2 text-gray-400"
                  >
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Developer-Friendly Integration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-gray-400 max-w-3xl mx-auto"
          >
            Get started in minutes with code snippets for every popular language
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {codeExamples.map((example, index) => (
            <motion.div
              key={example.language}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden"
            >
              <div className="flex items-center gap-2 p-4 border-b border-gray-700 bg-gray-900/50">
                <div className="p-1 rounded-full">
                  {example.icon}
                </div>
                <h3 className="font-medium">{example.language}</h3>
                <button className="ml-auto text-gray-400 hover:text-cyan-400">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <pre className="p-4 text-sm text-gray-300 overflow-x-auto bg-gray-900/50">
                {example.code}
              </pre>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-24 bg-gray-900/50 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Powerful Features, Simple Integration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-gray-400 max-w-3xl mx-auto"
          >
            All the tools you need to build, secure, and scale your API integrations
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-colors"
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit mb-4 text-cyan-400">
                {feature.icon}
              </div>
              <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Unified Payment Processing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-gray-400 max-w-3xl mx-auto"
          >
            Accept payments globally through a single API integration
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${method.color} p-4 rounded-lg border border-gray-700 flex flex-col items-center`}
            >
              {method.icon}
              <h3 className="font-medium mt-2">{method.name}</h3>
              <p className="text-xs text-gray-400 mt-1 text-center">{method.tagline}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 sm:p-12 border border-cyan-400/30 text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6"
          >
            Ready to Simplify Your API Integrations?
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
              className="rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity text-center"
            >
              Get Started Free
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href="#demo"
              className="rounded-md bg-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors text-center flex items-center justify-center gap-2"
            >
              <span>Watch Demo</span>
              <ChevronRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-cyan-400" />
              <span className="ml-2 text-xl font-bold">ZapStack</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              The developer-friendly API proxy that keeps your keys safe and your integrations simple.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#integrations" className="text-sm text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#status" className="text-sm text-gray-400 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#docs" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#tutorials" className="text-sm text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#support" className="text-sm text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#careers" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#legal" className="text-sm text-gray-400 hover:text-white transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ZapStack. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0 text-sm text-gray-400 flex items-center">
            <Heart className="h-4 w-4 text-red-400 mr-1" />
            Built with love for developers worldwide
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;