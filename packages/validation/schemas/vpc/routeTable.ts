import { commonSchema } from './base';
import { z } from 'zod';

export const routeTableSchema = z.object({
    ...commonSchema,
    vpc_no: z.string(),
    supported_subnet_type: z.enum(['PUBLIC', 'PRIVATE']),
    name: z.string().optional(),
    description: z.string().optional(),
});

export type RouteTableSchema = z.infer<typeof routeTableSchema>;
