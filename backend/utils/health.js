import mongoose from 'mongoose';
import promClient from 'prom-client';

const register = new promClient.Registry();

// Default metrics
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
});

const urlShortenCounter = new promClient.Counter({
    name: 'url_shorten_total',
    help: 'Total number of URLs shortened',
    registers: [register],
});

const urlRedirectCounter = new promClient.Counter({
    name: 'url_redirect_total',
    help: 'Total number of URL redirects',
    registers: [register],
});

// Health check endpoint
export const healthCheck = async (req, res) => {
    const startTime = Date.now();
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        checks: {},
    };

    try {
        // MongoDB connection check
        const mongoState = mongoose.connection.readyState;
        health.checks.mongodb = {
            status: mongoState === 1 ? 'healthy' : 'unhealthy',
            state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoState],
        };

        // JWT secret check
        health.checks.jwtSecret = {
            status: process.env.JWT_SECRET ? 'configured' : 'missing',
        };

        // Memory usage
        const memUsage = process.memoryUsage();
        health.checks.memory = {
            heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
            rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
        };

        // Overall health status
        const isHealthy =
            health.checks.mongodb.status === 'healthy' &&
            health.checks.jwtSecret.status === 'configured';

        health.status = isHealthy ? 'healthy' : 'degraded';
        health.responseTime = `${Date.now() - startTime}ms`;

        res.status(isHealthy ? 200 : 503).json(health);
    } catch (error) {
        health.status = 'error';
        health.error = error.message;
        res.status(503).json(health);
    }
};

// Metrics endpoint
export const metricsEndpoint = async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (error) {
        res.status(500).end(error.message);
    }
};

export { httpRequestDuration, urlShortenCounter, urlRedirectCounter, register };
