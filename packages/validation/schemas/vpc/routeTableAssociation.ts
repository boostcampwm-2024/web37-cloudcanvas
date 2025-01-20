import { commonSchema } from '../base';
import { z } from 'zod';

export const routeTableAssociationSchema = z
    .object({
        ...commonSchema,
        route_table_no: z.string(),
        subnet_no: z.string(),
    })
    .refine((data) => {
        return true;
    });

export type RouteTableAssociationSchema = z.infer<
    typeof routeTableAssociationSchema
>;
