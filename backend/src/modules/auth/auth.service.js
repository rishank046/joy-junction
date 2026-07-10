import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '#config/db';

const signToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const registerUser = async (name, email, password) => {
    // 1. Hash the incoming password string
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        // 2. Perform the database insert
        const queryText = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, created_at;
        `;
        const result = await pool.query(queryText, [name, email.toLowerCase().trim(), hashedPassword]);
        const newUser = result.rows[0];

        // 3. Construct the response payload parameters
        const token = signToken(newUser.id);
        
        return { token, user: newUser };
    } catch (error) {
        if (error.code === '23505') {
            throw new Error('Email address already registered.');
        }
        throw error;
    }
};

export const authenticateUser = async (email, password) => {
    // 1. Fetch user by indexed identifier
    const queryText = `SELECT id, name, email, password FROM users WHERE email = $1`;
    const result = await pool.query(queryText, [email.toLowerCase().trim()]);
    const user = result.rows[0];

    // 2. Verify existence and run cryptographic hash comparison
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Incorrect email or password.');
    }

    // 3. Compile output context
    const token = signToken(user.id);
    delete user.password;

    return { token, user };
};