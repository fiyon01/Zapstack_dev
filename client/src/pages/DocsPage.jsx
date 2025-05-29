import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Key, Code, Terminal, Server, CreditCard, 
  Link as LinkIcon, GitBranch, Clock, Hash, 
  ChevronDown, ChevronRight, Copy, Check, 
  AlertCircle, Lock, Shield, Globe, Cpu,
  BookOpen, MessageSquare, Github, Twitter,
  Menu, X, Search, ArrowRight, Circle,RefreshCw
} from 'lucide-react';

const DocsPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState('introduction');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <Zap className="h-4 w-4 text-cyan-400" />,
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              What is ZapStack?
            </h3>
            <p className="text-gray-300">
              ZapStack is a secure proxy service that helps developers integrate with multiple third-party payment or API services without exposing their credentials or dealing with provider-specific complexity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <Key className="h-5 w-5 text-cyan-400" />, title: 'API Key Protection', desc: 'Never expose your API keys - we store and rotate them securely' },
                { icon: <Server className="h-5 w-5 text-purple-400" />, title: 'Unified Interface', desc: 'Single API for multiple payment providers' },
                { icon: <Shield className="h-5 w-5 text-green-400" />, title: 'Enhanced Security', desc: 'Military-grade encryption for all transactions' },
                { icon: <Globe className="h-5 w-5 text-blue-400" />, title: 'Global Support', desc: 'Works with payment providers worldwide' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-3">How It Works</h3>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Register Project",
                  desc: "Create a project in ZapStack dashboard to get your zap-stack-key",
                  icon: <Key className="h-5 w-5" />
                },
                {
                  step: 2,
                  title: "Link Providers",
                  desc: "Connect your payment providers (M-Pesa, Stripe, etc.) by adding their API keys",
                  icon: <LinkIcon className="h-5 w-5" />
                },
                {
                  step: 3,
                  title: "Make Requests",
                  desc: "Send requests to ZapStack's unified API endpoint with your zap-stack-key",
                  icon: <Terminal className="h-5 w-5" />
                },
                {
                  step: 4,
                  title: "Get Responses",
                  desc: "Receive standardized responses or configure webhooks for async results",
                  icon: <Server className="h-5 w-5" />
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 relative pl-8"
                >
                  <div className="absolute left-0 top-0 h-full flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 border border-cyan-400/30">
                      {item.icon}
                    </div>
                    {i < 3 && (
                      <div className="w-px h-full bg-gradient-to-b from-cyan-400/20 to-purple-500/20"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'authentication',
      title: 'Authentication',
      icon: <Lock className="h-4 w-4 text-cyan-400" />,
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-3">API Keys</h3>
            <p className="text-gray-300 mb-4">
              All requests to the ZapStack API must include your <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">zap-stack-key</code> in the Authorization header.
            </p>
            
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-sm">Authorization Header</span>
                </div>
                <button 
                  onClick={() => copyToClipboard('Authorization: Bearer YOUR_ZAP_STACK_KEY', 'auth-header')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedCode === 'auth-header' ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-gray-300">
                  Authorization: Bearer YOUR_ZAP_STACK_KEY
                </code>
              </pre>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3">Key Management</h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Key Security
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  Your <code className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400 text-xs">zap-stack-key</code> should be kept secure and never exposed in client-side code. For web applications, make requests through your backend server.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-medium flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-purple-400" />
                  Multiple Environments
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  Generate separate keys for development, staging, and production environments in your project dashboard.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-medium flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-400" />
                  Key Rotation
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  You can rotate your keys at any time from the dashboard. Old keys will continue to work for 24 hours after rotation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'base-url',
      title: 'Base URL',
      icon: <Globe className="h-4 w-4 text-cyan-400" />,
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-3">API Endpoint</h3>
            <p className="text-gray-300 mb-4">
              All API requests should be made to the following base URL:
            </p>
            
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-sm">Base URL</span>
                </div>
                <button 
                  onClick={() => copyToClipboard('https://api.zapstack.dev/v1', 'base-url')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedCode === 'base-url' ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-gray-300">
                  https://api.zapstack.dev/v1
                </code>
              </pre>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3">Regional Endpoints</h3>
            <p className="text-gray-300 mb-4">
              For lower latency, you can use these regional endpoints:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { region: 'North America', url: 'https://us.api.zapstack.dev/v1', ping: '15ms' },
                { region: 'Europe', url: 'https://eu.api.zapstack.dev/v1', ping: '25ms' },
                { region: 'Africa', url: 'https://af.api.zapstack.dev/v1', ping: '45ms' },
                { region: 'Asia', url: 'https://as.api.zapstack.dev/v1', ping: '65ms' }
              ].map((endpoint, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{endpoint.region}</h4>
                      <p className="text-xs text-gray-400 mt-1 font-mono">{endpoint.url}</p>
                    </div>
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
                      ~{endpoint.ping}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'payments',
      title: 'Payments API',
      icon: <CreditCard className="h-4 w-4 text-cyan-400" />,
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-3">Payment Flow</h3>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/30">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Initiate Payment</h4>
                      <p className="text-sm text-gray-400">Send payment details to ZapStack</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/30">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Route to Provider</h4>
                      <p className="text-sm text-gray-400">ZapStack selects the right payment processor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-400/30">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Process Transaction</h4>
                      <p className="text-sm text-gray-400">Payment is completed with the provider</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <Terminal className="h-4 w-4" />
                      <span>Example Request</span>
                    </div>
                    <pre className="text-xs overflow-x-auto">
                      <code className="text-gray-300">
{`POST /v1/payments/initiate
Content-Type: application/json
Authorization: Bearer YOUR_ZAP_STACK_KEY

{
  "provider": "mpesa",
  "amount": 1000,
  "phone": "254712345678"
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: 'M-Pesa',
                  icon: <Zap className="h-5 w-5 text-green-500" />,
                  example: {
                    provider: 'mpesa',
                    amount: 1000,
                    phone: '254712345678'
                  }
                },
                {
                  name: 'Stripe',
                  icon: <CreditCard className="h-5 w-5 text-blue-500" />,
                  example: {
                    provider: 'stripe',
                    amount: 1000,
                    currency: 'USD',
                    email: 'customer@example.com'
                  }
                },
                {
                  name: 'PayPal',
                  icon: <CreditCard className="h-5 w-5 text-yellow-500" />,
                  example: {
                    provider: 'paypal',
                    amount: 50,
                    currency: 'USD',
                    email: 'customer@example.com'
                  }
                },
                {
                  name: 'Card Payments',
                  icon: <CreditCard className="h-5 w-5 text-purple-500" />,
                  example: {
                    provider: 'card',
                    amount: 100,
                    currency: 'USD',
                    card: {
                      number: '4242424242424242',
                      expiry_month: '12',
                      expiry_year: '2026',
                      cvv: '123'
                    }
                  }
                }
              ].map((method, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 p-4 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                      {method.icon}
                    </div>
                    <h4 className="font-medium">{method.name}</h4>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                    <pre className="text-xs overflow-x-auto">
                      <code className="text-gray-300">
                        {JSON.stringify(method.example, null, 2)}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-3">Response Handling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-5 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400 mb-3">
                  <Check className="h-5 w-5" />
                  <h4 className="font-medium">Success Response</h4>
                </div>
                <pre className="text-xs overflow-x-auto">
                  <code className="text-gray-300">
{`{
  "status": "success",
  "provider": "mpesa",
  "reference": "ZAP-12345",
  "provider_response": {
    "MerchantRequestID": "29115-34620561-1",
    "CheckoutRequestID": "ws_CO_27072017151044001",
    "ResponseCode": "0",
    "ResponseDescription": "Success"
  }
}`}
                  </code>
                </pre>
              </div>
              <div className="bg-gray-800/50 p-5 rounded-xl border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 mb-3">
                  <AlertCircle className="h-5 w-5" />
                  <h4 className="font-medium">Error Response</h4>
                </div>
                <pre className="text-xs overflow-x-auto">
                  <code className="text-gray-300">
{`{
  "status": "error",
  "error_code": "INVALID_PHONE",
  "message": "Phone number must be in E.164 format",
  "details": {
    "field": "phone",
    "requirement": "Must start with country code"
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      icon: <LinkIcon className="h-4 w-4 text-cyan-400" />,
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-3">Webhook Setup</h3>
            <p className="text-gray-300 mb-4">
              Configure webhooks to receive real-time notifications about payment events.
            </p>
            
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/30 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Set Callback URL</h4>
                      <p className="text-sm text-gray-400">
                        Configure your endpoint in the dashboard or include <code className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400 text-xs">callbackUrl</code> in requests
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/30 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Verify Signature</h4>
                      <p className="text-sm text-gray-400">
                        Validate webhook requests using the <code className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400 text-xs">X-ZapStack-Signature</code> header
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-400/30 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Process Events</h4>
                      <p className="text-sm text-gray-400">
                        Handle different event types like <code className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400 text-xs">payment.success</code> or <code className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400 text-xs">payment.failed</code>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <Terminal className="h-4 w-4" />
                      <span>Example Webhook Payload</span>
                    </div>
                    <pre className="text-xs overflow-x-auto">
                      <code className="text-gray-300">
{`{
  "event": "payment.success",
  "data": {
    "reference": "ZAP-12345",
    "amount": 1000,
    "currency": "KES",
    "provider": "mpesa",
    "metadata": {
      "phone": "254712345678"
    },
    "timestamp": "2023-07-27T12:34:56Z"
  }
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3">Event Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  event: 'payment.success',
                  desc: 'Payment completed successfully',
                  color: 'bg-green-500/10',
                  icon: <Check className="h-4 w-4 text-green-400" />
                },
                {
                  event: 'payment.failed',
                  desc: 'Payment failed or was declined',
                  color: 'bg-red-500/10',
                  icon: <AlertCircle className="h-4 w-4 text-red-400" />
                },
                {
                  event: 'payment.pending',
                  desc: 'Payment initiated but not yet completed',
                  color: 'bg-yellow-500/10',
                  icon: <Clock className="h-4 w-4 text-yellow-400" />
                },
                {
                  event: 'payment.refunded',
                  desc: 'Payment was refunded to customer',
                  color: 'bg-blue-500/10',
                  icon: <RefreshCw className="h-4 w-4 text-blue-400" />
                }
              ].map((event, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className={`${event.color} p-4 rounded-lg border border-gray-700 flex items-start gap-3`}
                >
                  <div className="p-2 rounded-lg bg-gray-900/50">
                    {event.icon}
                  </div>
                  <div>
                    <code className="text-sm font-mono">{event.event}</code>
                    <p className="text-sm text-gray-400 mt-1">{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'code-examples',
      title: 'Code Examples',
      icon: <Code className="h-4 w-4 text-cyan-400" />,
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-3">Language Examples</h3>
            
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
              <div className="flex overflow-x-auto">
                {['JavaScript', 'Python', 'PHP', 'Ruby', 'cURL'].map((lang, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(lang.toLowerCase())}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${activeTab === lang.toLowerCase() ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
                  >
                    {lang === 'JavaScript' && <Code className="h-4 w-4 text-yellow-400" />}
                    {lang === 'Python' && <Code className="h-4 w-4 text-blue-400" />}
                    {lang === 'PHP' && <Code className="h-4 w-4 text-purple-400" />}
                    {lang === 'Ruby' && <Code className="h-4 w-4 text-red-400" />}
                    {lang === 'cURL' && <Terminal className="h-4 w-4 text-green-400" />}
                    {lang}
                  </button>
                ))}
              </div>
              <div className="p-4 bg-gray-900/50">
                <AnimatePresence mode="wait">
                  {activeTab === 'javascript' && (
                    <motion.div
                      key="javascript"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>
{`// Using Fetch API
const response = await fetch('https://api.zapstack.dev/v1/payments/initiate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ZAP_STACK_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    provider: 'mpesa',
    amount: 1000,
    phone: '254712345678'
  })
});

const data = await response.json();
console.log(data);`}
                        </code>
                      </pre>
                    </motion.div>
                  )}
                  
                  {activeTab === 'python' && (
                    <motion.div
                      key="python"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>
{`# Using requests library
import requests

headers = {
  'Authorization': 'Bearer YOUR_ZAP_STACK_KEY',
  'Content-Type': 'application/json'
}

payload = {
  'provider': 'stripe',
  'amount': 1000,
  'currency': 'USD',
  'email': 'customer@example.com'
}

response = requests.post(
  'https://api.zapstack.dev/v1/payments/initiate',
  headers=headers,
  json=payload
)

print(response.json())`}
                        </code>
                      </pre>
                    </motion.div>
                  )}
                  
                  {activeTab === 'php' && (
                    <motion.div
                      key="php"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>
{`<?php
// Using cURL
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.zapstack.dev/v1/payments/initiate');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
  'provider' => 'paypal',
  'amount' => 50,
  'currency' => 'USD',
  'email' => 'customer@example.com'
]));

$headers = [
  'Authorization: Bearer YOUR_ZAP_STACK_KEY',
  'Content-Type: application/json'
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`}
                        </code>
                      </pre>
                    </motion.div>
                  )}
                  
                  {activeTab === 'ruby' && (
                    <motion.div
                      key="ruby"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>
{`# Using Net::HTTP
require 'net/http'
require 'uri'
require 'json'

uri = URI.parse("https://api.zapstack.dev/v1/payments/initiate")
request = Net::HTTP::Post.new(uri)
request.content_type = "application/json"
request["Authorization"] = "Bearer YOUR_ZAP_STACK_KEY"
request.body = JSON.dump({
  "provider" => "card",
  "amount" => 100,
  "currency" => "USD",
  "card" => {
    "number" => "4242424242424242",
    "expiry_month" => "12",
    "expiry_year" => "2026",
    "cvv" => "123"
  }
})

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

puts response.body`}
                        </code>
                      </pre>
                    </motion.div>
                  )}
                  
                  {activeTab === 'curl' && (
                    <motion.div
                      key="curl"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>
{`# Direct cURL request
curl -X POST https://api.zapstack.dev/v1/payments/initiate \\
  -H "Authorization: Bearer YOUR_ZAP_STACK_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "mpesa",
    "amount": 1000,
    "phone": "254712345678"
  }'`}
                        </code>
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3">SDKs</h3>
            <p className="text-gray-300 mb-4">
              Official ZapStack SDKs for popular programming languages:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'JavaScript/Node.js',
                  icon: <Code className="h-5 w-5 text-yellow-400" />,
                  install: 'npm install @zapstack/sdk',
                  link: 'https://github.com/zapstack/js-sdk'
                },
                {
                  name: 'Python',
                  icon: <Code className="h-5 w-5 text-blue-400" />,
                  install: 'pip install zapstack',
                  link: 'https://github.com/zapstack/py-sdk'
                },
                {
                  name: 'PHP',
                  icon: <Code className="h-5 w-5 text-purple-400" />,
                  install: 'composer require zapstack/sdk',
                  link: 'https://github.com/zapstack/php-sdk'
                },
                {
                  name: 'Ruby',
                  icon: <Code className="h-5 w-5 text-red-400" />,
                  install: 'gem install zapstack',
                  link: 'https://github.com/zapstack/ruby-sdk'
                },
                {
                  name: 'Java',
                  icon: <Code className="h-5 w-5 text-orange-400" />,
                  install: '<dependency>\n  <groupId>dev.zapstack</groupId>\n  <artifactId>sdk</artifactId>\n</dependency>',
                  link: 'https://github.com/zapstack/java-sdk'
                },
                {
                  name: 'Go',
                  icon: <Code className="h-5 w-5 text-cyan-400" />,
                  install: 'go get github.com/zapstack/go-sdk',
                  link: 'https://github.com/zapstack/go-sdk'
                }
              ].map((sdk, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 p-4 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                      {sdk.icon}
                    </div>
                    <h4 className="font-medium">{sdk.name}</h4>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 mb-3">
                    <pre className="text-xs overflow-x-auto">
                      <code className="text-gray-300">
                        {sdk.install}
                      </code>
                    </pre>
                  </div>
                  <a 
                    href={sdk.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View on GitHub</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen flex">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-gray-900/95 border-r border-gray-800 backdrop-blur-lg overflow-y-auto md:hidden"
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center">
                <Zap className="h-6 w-6 text-cyan-400" />
                <span className="ml-2 text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ZapStack Docs</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setExpandedSection(section.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${expandedSection === section.id ? 'bg-gray-800/50 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/30'}`}
                  >
                    <div className="flex items-center gap-2">
                      {section.icon}
                      {section.title}
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`} />
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-72 border-r border-gray-800 bg-gray-900/80 backdrop-blur-lg flex flex-col">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-6 w-6 text-cyan-400" />
              </motion.div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ZapStack Docs</span>
            </div>
            <div className="relative mt-6">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setExpandedSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${expandedSection === section.id ? 'bg-gray-800/50 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/30'}`}
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                <MessageSquare className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm">Need help?</p>
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">Contact support</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden bg-gray-900/80 border-b border-gray-800 backdrop-blur-lg p-4 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-400 hover:text-white p-1 rounded-md"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ZapStack Docs</span>
          </div>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {sections.map((section) => (
                expandedSection === section.id && (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                      {section.icon}
                      {section.title}
                    </h2>
                    {section.content}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900/80 border-t border-gray-800 backdrop-blur-lg p-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Zap className="h-5 w-5 text-cyan-400" />
              <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ZapStack</span>
              <span className="text-gray-400 text-sm">API Documentation</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Privacy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DocsPage;