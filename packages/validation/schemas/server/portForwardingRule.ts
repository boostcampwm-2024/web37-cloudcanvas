import { z } from 'zod';
import { commonSchema } from '../base';

export const portForwardingRuleSchema = z
    .object({
        ...commonSchema,
        server_instance_no: z.string(),
        port_forwarding_external_port: z.string(),
        port_forwarding_internal_port: z
            .string()
            .refine((port) => ['22', '3389'].includes(port), {
                message: 'internal port는 22 또는 3389만 가능합니다',
            }),
        port_forwarding_configuration_no: z.string().optional(),
    })
    .refine(
        (data) => {
            const externalPort = parseInt(data.port_forwarding_external_port);
            return (
                !isNaN(externalPort) && externalPort > 0 && externalPort < 65536
            );
        },
        {
            message: 'external port는 1에서 65535 사이의 숫자여야 합니다',
        },
    );

export type PortForwardingRuleSchema = z.infer<typeof portForwardingRuleSchema>;
