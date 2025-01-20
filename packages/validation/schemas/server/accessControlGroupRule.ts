import { commonSchema } from '../base';
import { networkRuleSchema } from '../vpc/networkRule';
import { z } from 'zod';

export const accessControlGroupRuleSchema = z
    .object({
        ...commonSchema,
        access_control_group_no: z.string(),
        inbound: z.array(networkRuleSchema).optional(),
        outbound: z.array(networkRuleSchema).optional(),
    })
    .refine(
        (data) => {
            return !!(data.inbound || data.outbound);
        },
        {
            message: 'inbound 또는 outbound 중 하나는 반드시 필요합니다',
        },
    );

export type AccessControlGroupRuleSchema = z.infer<
    typeof accessControlGroupRuleSchema
>;
