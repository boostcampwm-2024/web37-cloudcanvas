import { z } from 'zod';
import { commonSchema } from './base';

export const routeSchema = z.object({
    ...commonSchema,
    route_table_no: z.string(),
    destination_cidr_block: z
        .string()
        .regex(/^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/, {
            message: 'destination_cidr_block는 IPv4 CIDR 형식이어야 합니다',
        }),
    target_type: z.enum(['NATGW', 'VPCPEERING', 'VGW']),
    target_no: z.string(),
    target_name: z.string(),
});

export type RouteSchema = z.infer<typeof routeSchema>;
