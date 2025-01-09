import { commonSchema } from './base';
import { z } from 'zod';

export const accessControlGroupSchema = z.object({
    ...commonSchema,
    vpc_no: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
});

export type AccessControlGroupSchema = z.infer<typeof accessControlGroupSchema>;
