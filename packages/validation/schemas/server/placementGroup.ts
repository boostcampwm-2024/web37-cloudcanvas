import { z } from 'zod';
import { commonSchema } from './base';

export const placementGroupSchema = z.object({
    ...commonSchema,
    name: z.string().optional(),
    placement_group_type: z.enum(['AA']).optional().default('AA'),
});

export type PlacementGroupSchema = z.infer<typeof placementGroupSchema>;
