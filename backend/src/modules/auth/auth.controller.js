import * as authService from './auth.service.js';

export const signup = async (req, res , next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new Error('Please provide name, email, and password.');
    }

    // Hand off values to service layer execution context
    const { token, user } = await authService.registerUser(name, email, password);

    return res.status(201).json({
        success: true,
        token,
        data: { user }
    });
};

export const login = async (req, res , next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error('Please provide email and password.');
    }

    // Fetch verified dataset from service layer
    const { token, user } = await authService.authenticateUser(email, password);

    return res.status(200).json({
        success: true,
        token,
        data: { user }
    });
};