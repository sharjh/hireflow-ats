const { z } = require('zod');

const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(['CANDIDATE', 'COMPANY']),
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

module.exports = { registerSchema, loginSchema };