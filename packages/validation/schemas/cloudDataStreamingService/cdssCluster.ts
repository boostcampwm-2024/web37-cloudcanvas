import { z } from 'zod';
import { commonSchema } from '../base';
import { cmakConfigSchema } from './cmakConfig';
import { nodeConfigSchema } from './nodeConfig';

export const cdssClusterSchema = z.object({
    ...commonSchema,
    name: z.string(),
    kafka_version_code: z.string(),
    config_group_no: z.string(),
    vpc_no: z.string(),
    os_image: z.string(),
    cmak: cmakConfigSchema,
    manager_node: nodeConfigSchema,
    broker_nodes: nodeConfigSchema.extend({
        node_count: z.number().min(3).max(10),
        storage_size: z
            .number()
            .min(100)
            .max(2000)
            .refine((size) => size % 10 === 0, {
                message: 'storage size는 10의 배수여야 합니다.',
            }),
    }),
});

export type CdssClusterSchema = z.infer<typeof cdssClusterSchema>;
