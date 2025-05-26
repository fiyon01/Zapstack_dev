import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Zap, Server, CreditCard, Globe, Key, Lock, ChevronDown,
  Plus, Code, Copy, Check, X, ArrowLeft, Loader2, ArrowRight, 
  Settings, Shield, Link as LinkIcon
} from 'lucide-react';
import Navbar from '../components/Navbar';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState('');
  const [step, setStep] = useState(1);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState([{ name: '', value: '' }]);

  const [formData, setFormData] = useState({
    name: '',
    environment: 'development',
    callbackUrl: '',
    baseUrl: '',
    apiKey: '',
    paymentProvider: 'mpesa',
    shortcode: '',
    passkey: '',
    consumerKey: '',
    consumerSecret: '',
    stripeSecretKey: '',
    stripePublishableKey: '',
    paypalClientId: '',
    paypalSecret: '',
    paystackPublicKey: '',
    paystackSecretKey: ''
  });

  const paymentProviders = [
    { value: 'mpesa', label: 'M-Pesa', icon: <Zap className="h-5 w-5 text-green-500" /> },
    { value: 'stripe', label: 'Stripe', icon: <CreditCard className="h-5 w-5 text-blue-500" /> },
    { value: 'paypal', label: 'PayPal', icon: <CreditCard className="h-5 w-5 text-yellow-500" /> },
    { value: 'paystack', label: 'Paystack', icon: <CreditCard className="h-5 w-5 text-purple-500" /> }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHeaderChange = (index, field, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  const addHeader = () => setHeaders([...headers, { name: '', value: '' }]);
  const removeHeader = (index) => setHeaders(headers.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        type: projectType,
        environment: formData.environment
      };

      if (projectType === 'api_proxy') {
        payload.baseUrl = formData.baseUrl;
        payload.apiKey = formData.apiKey;
        payload.headers = headers.reduce((acc, { name, value }) => {
          if (name && value) acc[name] = value;
          return acc;
        }, {});
      } else {
        payload.callbackUrl = formData.callbackUrl || `https://api.zapstack.com/webhook/default`;
        payload.provider = formData.paymentProvider;
        payload.credentials = getProviderCredentials();
      }

      const response = await axios.post('http://localhost:3500/api/create/new/project', payload);
      if (response.status === 201) {
        setModalContent(generateIntegrationInstructions(response.data.project));
        setShowIntegrationModal(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProviderCredentials = () => {
    switch(formData.paymentProvider) {
      case 'mpesa':
        return {
          shortcode: formData.shortcode,
          passkey: formData.passkey,
          consumerKey: formData.consumerKey,
          consumerSecret: formData.consumerSecret
        };
      case 'stripe':
        return {
          secretKey: formData.stripeSecretKey,
          publishableKey: formData.stripePublishableKey
        };
      case 'paypal':
        return {
          clientId: formData.paypalClientId,
          secret: formData.paypalSecret
        };
      case 'paystack':
        return {
          publicKey: formData.paystackPublicKey,
          secretKey: formData.paystackSecretKey
        };
      default:
        return {};
    }
  };

  const generateIntegrationInstructions = (project) => {
    if (project.type === 'api_proxy') {
      return {
        title: 'API Integration Instructions',
        content: (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-cyan-400 mb-2">Base URL</h4>
              <p className="text-sm text-gray-300 mb-2">Endpoint to make requests through ZapStack:</p>
              <code className="text-sm bg-gray-900 p-2 rounded flex items-center justify-between">
                {project.baseUrl}
                <button onClick={() => navigator.clipboard.writeText(project.baseUrl)}>
                  <Copy className="h-4 w-4 text-gray-400 hover:text-cyan-400" />
                </button>
              </code>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-cyan-400 mb-2">Authentication</h4>
              <p className="text-sm text-gray-300 mb-2">Include this API key in your requests:</p>
              <code className="text-sm bg-gray-900 p-2 rounded flex items-center justify-between">
                {project.apiKey}
                <button onClick={() => navigator.clipboard.writeText(project.apiKey)}>
                  <Copy className="h-4 w-4 text-gray-400 hover:text-cyan-400" />
                </button>
              </code>
            </div>

            {Object.keys(project.headers || {}).length > 0 && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium text-cyan-400 mb-2">Custom Headers</h4>
                <pre className="text-sm bg-gray-900 p-2 rounded overflow-x-auto">
                  {JSON.stringify(project.headers, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-cyan-400 mb-2">Example Requests</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-1">JavaScript (Fetch)</h5>
                  <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto">
{`fetch('${project.baseUrl}/endpoint', {
  headers: {
    'Authorization': 'Bearer ${project.apiKey}',
    ${Object.entries(project.headers || {}).map(([k,v]) => `'${k}': '${v}'`).join(',\n    ')}
  }
})`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )
      };
    } else {
      return {
        title: `${project.provider} Integration`,
        content: (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Webhook URL</h4>
              <code className="text-sm bg-gray-900 p-2 rounded flex items-center justify-between">
                {project.callback_url}
                <button onClick={() => navigator.clipboard.writeText(project.callback_url)}>
                  <Copy className="h-4 w-4 text-gray-400 hover:text-purple-400" />
                </button>
              </code>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Frontend Integration</h4>
              <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto">
{`<script src="https://cdn.zapstack.com/js/v1/payment-widget.js"></script>
<script>
  ZapStack.init({
    projectId: '${project.id}',
    onSuccess: (payment) => console.log(payment)
  });
</script>`}
              </pre>
            </div>
          </div>
        )
      };
    }
  };

  const closeModal = () => {
    setShowIntegrationModal(false);
    navigate('/projects');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      
      <div className="p-4 sm:p-6 pt-20">
        <div className="flex items-center gap-2 mb-6 pt-12 md:pt-16 lg:pt-20">
          <button 
            onClick={() => navigate('/projects')}
            className="text-gray-400 hover:text-cyan-400"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Create New Project
          </h1>
        </div>

        <div className="flex mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className={`flex-1 border-b-2 ${step >= stepNum ? 'border-cyan-400' : 'border-gray-700'} pb-2`}>
              <p className={`text-sm ${step >= stepNum ? 'text-cyan-400' : 'text-gray-500'}`}>
                {stepNum}. {['Type', 'Configuration', 'Review'][stepNum-1]}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200">Select Project Type</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setProjectType('api_proxy')}
                  className={`p-6 rounded-xl border-2 transition-all ${projectType === 'api_proxy' 
                    ? 'border-cyan-400 bg-gray-800/50 ring-2 ring-cyan-400/30' 
                    : 'border-gray-700 hover:border-gray-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${projectType === 'api_proxy' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-gray-700 text-gray-400'}`}>
                      <Server className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">API Integration</h3>
                      <p className="text-sm text-gray-400">Connect your existing API</p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectType('payments')}
                  className={`p-6 rounded-xl border-2 transition-all ${projectType === 'payments' 
                    ? 'border-purple-400 bg-gray-800/50 ring-2 ring-purple-400/30' 
                    : 'border-gray-700 hover:border-gray-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${projectType === 'payments' ? 'bg-purple-400/20 text-purple-400' : 'bg-gray-700 text-gray-400'}`}>
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Payments</h3>
                      <p className="text-sm text-gray-400">Accept payments from customers</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => projectType && setStep(2)}
                  disabled={!projectType}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200">Project Configuration</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Environment</label>
                    <select
                      name="environment"
                      value={formData.environment}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      <option value="development">Development</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                </div>

                {projectType === 'api_proxy' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Base URL</label>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <input
                          type="url"
                          name="baseUrl"
                          value={formData.baseUrl}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="https://api.example.com/v1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">API Key</label>
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-gray-500" />
                        <input
                          type="text"
                          name="apiKey"
                          value={formData.apiKey}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="Your API key"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Custom Headers</label>
                      <div className="space-y-3">
                        {headers.map((header, index) => (
                          <div key={index} className="grid grid-cols-5 gap-2 items-center">
                            <input
                              type="text"
                              value={header.name}
                              onChange={(e) => handleHeaderChange(index, 'name', e.target.value)}
                              className="col-span-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                              placeholder="Header name"
                            />
                            <input
                              type="text"
                              value={header.value}
                              onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                              className="col-span-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                              placeholder="Header value"
                            />
                            <button
                              type="button"
                              onClick={() => removeHeader(index)}
                              className="text-gray-500 hover:text-red-400 transition-colors flex justify-center"
                              disabled={headers.length <= 1}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        type="button"
                        onClick={addHeader}
                        className="mt-2 text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        Add another header
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Callback URL</label>
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-gray-500" />
                        <input
                          type="url"
                          name="callbackUrl"
                          value={formData.callbackUrl}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="https://yourdomain.com/callback"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Leave blank to use our default webhook URL
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Payment Provider</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {paymentProviders.map(provider => (
                          <button
                            key={provider.value}
                            type="button"
                            onClick={() => handleChange({ target: { name: 'paymentProvider', value: provider.value } })}
                            className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${formData.paymentProvider === provider.value ? 'border-purple-400 bg-purple-400/10' : 'border-gray-700 hover:border-gray-600'} transition-colors`}
                          >
                            {provider.icon}
                            <span>{provider.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.paymentProvider === 'mpesa' && (
                      <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg">
                        <h3 className="font-medium text-green-400 flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          M-Pesa Configuration
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Shortcode</label>
                            <input
                              type="text"
                              name="shortcode"
                              value={formData.shortcode}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Passkey</label>
                            <input
                              type="text"
                              name="passkey"
                              value={formData.passkey}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Consumer Key</label>
                            <input
                              type="text"
                              name="consumerKey"
                              value={formData.consumerKey}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Consumer Secret</label>
                            <input
                              type="text"
                              name="consumerSecret"
                              value={formData.consumerSecret}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Other payment provider configurations would go here */}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Review <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200">Review Your Project</h2>
              
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-medium mb-4">{formData.name}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="font-medium">
                      {projectType === 'api_proxy' ? (
                        <span className="text-cyan-400 flex items-center gap-1">
                          <Server className="h-4 w-4" />
                          API Integration
                        </span>
                      ) : (
                        <span className="text-purple-400 flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          Payments ({formData.paymentProvider})
                        </span>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Environment</span>
                    <span className={`font-medium ${formData.environment === 'production' ? 'text-green-400' : 'text-amber-400'}`}>
                      {formData.environment === 'production' ? 'Production' : 'Sandbox'}
                    </span>
                  </div>
                  
                  {projectType === 'api_proxy' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Base URL</span>
                        <span className="font-mono text-sm text-gray-300">{formData.baseUrl}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">API Key</span>
                        <span className="font-mono text-sm text-gray-300">
                          {formData.apiKey ? `${formData.apiKey.substring(0, 6)}...${formData.apiKey.substring(formData.apiKey.length - 4)}` : 'Not set'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Callback URL</span>
                      <span className="font-mono text-sm text-gray-300">
                        {formData.callbackUrl || 'Using default webhook URL'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Create Project
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {showIntegrationModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {modalContent.title}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {modalContent.content}
              
              <div className="flex justify-end pt-6">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Finish <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProjectPage;