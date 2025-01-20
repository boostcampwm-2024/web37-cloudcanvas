import { z } from 'zod';
import { commonSchema } from '../base';

export const publicIpSchema = z.object({
    ...commonSchema,
    server_instance_no: z.string().optional(),
    description: z.string().optional(),
    zone: z.string().optional(),
});

export type PublicIpSchema = z.infer<typeof publicIpSchema>;
