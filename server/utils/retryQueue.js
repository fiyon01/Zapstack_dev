const axios = require('axios');

const retryQueue = [];

function addToRetryQueue(url, payload, projectId) {
  retryQueue.push({ url, payload, projectId, attempts: 1 });
}

// Retry logic runs every minute
setInterval(async () => {
  for (let i = retryQueue.length - 1; i >= 0; i--) {
    const item = retryQueue[i];
    try {
      await axios.post(item.url, item.payload, {
        headers: {
          'Content-Type': 'application/json',
          'x-zapstack-project-id': item.projectId,
        }
      });
      retryQueue.splice(i, 1); // Remove on success
    } catch (err) {
      item.attempts++;
      if (item.attempts > 5) retryQueue.splice(i, 1); // Drop after 5 tries
    }
  }
}, 60 * 1000);

module.exports = { addToRetryQueue };
