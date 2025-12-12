import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'URL Shortener API',
            version: '1.0.0',
            description: 'A comprehensive URL shortening service with analytics and password protection',
            contact: {
                name: 'API Support',
                email: 'support@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
            {
                url: 'https://api.example.com',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                URL: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'URL ID',
                        },
                        originalUrl: {
                            type: 'string',
                            format: 'uri',
                            description: 'Original long URL',
                        },
                        shortUrl: {
                            type: 'string',
                            description: 'Shortened URL code',
                        },
                        clicks: {
                            type: 'integer',
                            description: 'Number of clicks',
                        },
                        isPasswordProtected: {
                            type: 'boolean',
                        },
                        isActive: {
                            type: 'boolean',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
