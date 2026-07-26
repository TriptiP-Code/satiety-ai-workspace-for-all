const client = require("prom-client");

// Collect default Node.js metrics
client.collectDefaultMetrics();

// Counter for HTTP requests
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

// Histogram for response time
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});

module.exports = {
  client,
  httpRequestsTotal,
  httpRequestDuration,
};