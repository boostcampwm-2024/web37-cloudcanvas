import { z } from 'zod';
import { commonSchema } from './base';

export const loginKeySchema = z.object({
    ...commonSchema,
    key_name: z.string(),
});

export type LoginKeySchema = z.infer<typeof loginKeySchema>;