// vpc.ts schema
import { z } from 'zod';
import { commonSchema } from './base';

export const vpcSchema = z.object({
    ...commonSchema,
    name: z.string().optional(),
    ipv4_cidr_block: z.string().refine(
        (cidr) => {
            const cidrPattern = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
            if (!cidrPattern.test(cidr)) return false;

            const [ip, mask] = cidr.split('/');
            const maskNum = parseInt(mask);

            if (maskNum < 16 || maskNum > 28) return false;

            const octets = ip.split('.').map((num) => parseInt(num));

            const isPrivate =
                octets[0] === 10 ||
                (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
                (octets[0] === 192 && octets[1] === 168);

            return isPrivate;
        },
        {
            message:
                'CIDR block must be between /16 and /28 within private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)',
        },
    ),
});

export type VPCSchema = z.infer<typeof vpcSchema>;
