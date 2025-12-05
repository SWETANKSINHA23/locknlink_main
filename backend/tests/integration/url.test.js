import request from 'supertest';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import urlRoutes from '../../routes/urlRoutes.js';
import { protect } from '../../middlewares/authMiddleware.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
process.env.JWT_SECRET = 'test_secret';

const app = express();
app.use(express.json());

// Mock auth middleware for testing
app.use((req, res, next) => {
    req.user = { id: new mongoose.Types.ObjectId() };
    next();
});

app.use('/api', urlRoutes);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message });
});

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('URL Endpoints', () => {
    it('should shorten a URL', async () => {
        const res = await request(app)
            .post('/api/shorten')
            .send({
                originalUrl: 'https://example.com',
                alias: 'testalias'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('shortUrl');
    });

    // Add more tests as needed per requirements
});
