import { z } from 'zod';

export const networkRuleSchema = z.object({
    protocol: z.enum(['TCP', 'UDP', 'ICMP']),
    ip_block: z.string().optional(),
    source_access_control_group_no: z.string().optional(),
    port_range: z.string()
        .regex(/^\d+(-\d+)?$/)
        .refine(range => {
            const [start, end] = range.split('-').map(Number);
            return end ? (start >= 1 && end <= 65535 && start <= end) : (start >= 1 && start <= 65535);
        }, {
            message: 'port range는 1부터 65535 사이의 숫자이어야 합니다',
        })
        .optional(),
    description: z.string().optional(),
}).refine(data => {
    return !!(data.ip_block || data.source_access_control_group_no);
}, {
    message: 'ip_block 또는 source_access_control_group_no 중 하나는 반드시 필요합니다',
});