import { z } from 'zod';

export const commonSchema = {
    name: z.string().optional(),
    region: z.string().optional(),
};
