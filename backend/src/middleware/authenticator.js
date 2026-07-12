import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import pool from '#config/db';
import catchWrapper from '#middleware/catchWrapper';

/**
 * Gateway Route Guard
 * Verifies the JWT signature, decodes the user ID payload,
 * and asserts that the user record still exists in the database.
 */
const authenticate = catchWrapper(async (req, res, next) => {
    let token;

    // 1. Extract Bearer token pattern from standard HTTP Authorization headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new Error('Token Not Found');
    }

    try {
        // 2. Verify cryptographic signature integrity
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3. Fetch user identity based on token payload metric (decoded.id)
        const userQuery = `SELECT id, name, email FROM users WHERE id = $1`;
        const result = await pool.query(userQuery, [decoded.id]);
        const currentUser = result.rows[0];

        if (!currentUser) {
            throw new Error('INVALID_TOKEN');
        }

        // 4. Mount the authenticated identity object directly onto the Express request state
        // This makes req.user accessible inside your downstream controllers
        req.user = currentUser;
        
        return next();
        
    } catch (error) {
        // Intercept native jsonwebtoken verification failure naming structures
        if (error.name === 'JsonWebTokenError') {
            throw new Error('INVALID_TOKEN');
        }
        if (error.name === 'TokenExpiredError') {
            throw new Error('INVALID_TOKEN');
        }
        throw error; // Re-throw unhandled errors to the catchWrapper
    }
});

export default authenticate;