import { z } from 'zod';

export const networkAclRuleConfigSchema = z.object({
    priority: z.number().int().min(1).max(199),
    protocol: z.enum(['TCP', 'UDP', 'ICMP']),
    rule_action: z.enum(['ALLOW', 'DROP']),
    ip_block: z.string().optional(),
    deny_allow_group_no: z.string().optional(),
    port_range: z.string()
        .regex(/^\d+(-\d+)?$/)
        .refine(range => {
            const [start, end] = range.split('-').map(Number);
            return end ? (start >= 1 && end <= 65535 && start <= end) : (start >= 1 && start <= 65535);
        }, {
            message: 'port_range는 1-65535 사이의 숫자 혹은 1개의 숫자여야 합니다',
        })
        .optional(),
    description: z.string().optional(),
}).refine(data => {
    return !!(data.ip_block || data.deny_allow_group_no);
}, {
    message: 'ip_block 혹은 deny_allow_group_no는 필수입니다',
});
