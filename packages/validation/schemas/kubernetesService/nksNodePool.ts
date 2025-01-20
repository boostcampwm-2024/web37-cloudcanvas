import { z } from 'zod';
import { commonSchema } from '../base';

const labelSchema = z.object({
    key: z.string(),
    value: z.string(),
});

const taintSchema = z.object({
    key: z.string(),
    value: z.string(),
    effect: z.string(),
});

const autoscaleSchema = z
    .object({
        enabled: z.boolean(),
        min: z.number().int().min(0),
        max: z.number().int(),
    })
    .refine(
        (data) => {
            if (data.enabled) {
                return data.max >= data.min;
            }
            return true;
        },
        {
            message: 'max는 min보다 크거나 같아야 합니다.',
        },
    );

export const nksNodePoolSchema = z
    .object({
        ...commonSchema,
        node_pool_name: z.string(),
        cluster_uuid: z.string(),
        node_count: z.number().int().optional(),
        product_code: z.string().optional(),
        server_spec_code: z.string().optional(),
        storage_size: z.number().int().min(100).optional(),
        software_code: z.string().optional(),
        server_role_id: z.string().optional(),
        autoscale: autoscaleSchema.optional(),
        subnet_no_list: z.array(z.string()).optional(),
        k8s_version: z.string().optional(),
        label: z.array(labelSchema).optional(),
        taint: z.array(taintSchema).optional(),
    })
    .refine(
        (data) => {
            if (
                !data.autoscale?.enabled &&
                typeof data.node_count !== 'number'
            ) {
                return false;
            }
            return true;
        },
        {
            message: 'node count는 autoscale이 비활성화된 경우 필수입니다.',
        },
    )
    .refine(
        (data) => {
            return !!(data.product_code || data.server_spec_code);
        },
        {
            message: 'product code 또는 server spec code 중 하나는 필수입니다.',
        },
    );

export type NksNodePoolSchema = z.infer<typeof nksNodePoolSchema>;
