const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');
const webhooksRoutes = require('./routes/webhooksRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const response = require('./routes/response');
const callbackRoutes = require('./routes/callbackRoutes');
const authRoutes = require('./routes/authRoutes');
const createProjectRoutes = require('./routes/createProjectRoutes');
const projectsRoutes = require("./routes/projectsRoutes")
const specificProjectRoutes = require("./routes/specificProjectRoutes")
const projectLogsRoutes = require("./routes/projectLogsRoutes")
const paymentLimiter = require("./utils/paymentLimiter")

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Normal middleware/routes go here

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/webhooks', webhooksRoutes);
app.use('/api/initiate/payments', paymentLimiter,paymentRoutes);
app.use('/api/mpesa', response);
app.use('/api/mpesa', callbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/create/new', createProjectRoutes);
app.use("/api/fetch" , projectsRoutes)
app.use('/api/projects', specificProjectRoutes);
app.use('/api/projects', projectLogsRoutes);
// Start HTTPS server
 app.listen(3500, () => {
  console.log('🚀 Server running at http://localhost:3500');
});
