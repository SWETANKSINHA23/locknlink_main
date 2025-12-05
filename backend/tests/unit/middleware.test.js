import { protect } from '../../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import { jest } from '@jest/globals';

describe('Auth Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        process.env.JWT_SECRET = 'testsecret';
    });

    it('should call next if token is valid', async () => {
        const token = jwt.sign({ id: '123' }, process.env.JWT_SECRET);
        req.headers.authorization = `Bearer ${token}`;

        // partial mock of User model if needed, but protect middleware might query DB.
        // If protect middleware queries DB, we need to mock User.findById or use integration test.
        // For unit testing middleware that depends on DB, best to mock the model import.
    });

    it('should return 401 if no token', async () => {
        await protect(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
    });

    it('should return 401 if token is invalid', async () => {
        req.headers.authorization = 'Bearer invalidtoken';
        await protect(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed' });
    });
});
