const { z } = require('zod');

const applySchema = z.object({
    jobId: z.int(),
    resume_url: z.url(),
    cover_letter: z.optional(z.string())
});

const updateApplicationSchema = z.object({ status: z.enum(['APPLIED', 'REVIEWED', 'REJECTED', 'ACCEPTED']), });

module.exports = { applySchema, updateApplicationSchema };