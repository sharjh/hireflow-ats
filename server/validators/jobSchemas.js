const { z } = require('zod');

const createJobSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    employment_type: z.enum([
        'FULL_TIME',
        'PART_TIME',
        'CONTRACT',
        'INTERNSHIP',
        'FREELANCE',
        'TEMPORARY',
    ]),
    location: z.string().min(2),
});

module.exports = { createJobSchema };