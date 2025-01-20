import { z } from 'zod';
import { commonSchema } from '../base';

export const cdssConfigGroupSchema = z.object({
    ...commonSchema,
    name: z.string(),
    kafka_version_code: z.string(),
    description: z.string().optional(),
});

export type CdssConfigGroupSchema = z.infer<typeof cdssConfigGroupSchema>;
