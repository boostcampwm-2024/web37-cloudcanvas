import { commonSchema } from './base';
import { z } from 'zod';
import { networkAclRuleConfigSchema } from './networkAclRuleConfig';

export const networkAclRuleSchema = z
    .object({
        ...commonSchema,
        network_acl_no: z.string(),
        inbound: z.array(networkAclRuleConfigSchema).optional(),
        outbound: z.array(networkAclRuleConfigSchema).optional(),
    })
    .refine(
        (data) => {
            return !!(data.inbound || data.outbound);
        },
        {
            message: 'inbound 혹은 outbound 중 하나는 필수입니다',
        },
    );

export type NetworkAclRuleSchema = z.infer<typeof networkAclRuleSchema>;
