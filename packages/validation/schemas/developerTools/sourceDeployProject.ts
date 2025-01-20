import { z } from 'zod';
import { commonSchema } from '../base';

export const sourceDeployProjectSchema = z.object({
    ...commonSchema,
    name: z.string(),
});

export type SourceDeployProjectSchema = z.infer<
    typeof sourceDeployProjectSchema
>;
