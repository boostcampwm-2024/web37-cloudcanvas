import { z } from 'zod';
import { commonSchema } from '../base';

export const autoScalingPolicySchema = z.object({
    ...commonSchema,
    name: z.string().regex(/^[a-z][a-z0-9-]*[a-z0-9]$/, {
        message:
            'name은 소문자로 시작하고, 소문자, 숫자, 대시(-)만 사용할 수 있으며, 대시로 끝날 수 없습니다',
    }),
    adjustment_type_code: z.enum(['CHANG', 'EXACT', 'PRCNT']),
    scaling_adjustment: z.number(),
    auto_scaling_group_no: z.string(),
    cooldown: z.number().optional(),
    min_adjustment_step: z.number().optional(),
});

export type AutoScalingPolicySchema = z.infer<typeof autoScalingPolicySchema>;
