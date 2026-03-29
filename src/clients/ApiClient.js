const fs = require('fs');
const path = require('path');
const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const winston = require('winston');
require('dotenv').config({ quiet: true });

const logsDir = path.resolve(__dirname, '../../logs');
fs.mkdirSync(logsDir, { recursive: true });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, 'api-test.log') }),
    new winston.transports.Console()
  ]
});

const ApiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

axiosRetry(ApiClient, { 
  retries: 3, 
  retryDelay: axiosRetry.exponentialDelay,
  onRetry: (retryCount) => logger.warn(`[RETRY] Attempt ${retryCount}`)
});

ApiClient.interceptors.request.use((config) => {
  logger.info(`[REQ] ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

ApiClient.interceptors.response.use(
  (response) => {
    logger.info(`[RES] Status: ${response.status}`);
    return response;
  },
  (error) => {
    logger.error(`[ERR] ${error.message}`);
    return Promise.reject(error);
  }
);

module.exports = { ApiClient, logger };
