import { z } from 'zod';
import { commonSchema } from '../base';

const serverConfigSchema = z.object({
    id: z.number(),
});

const configSchema = z
    .object({
        server: serverConfigSchema.optional(),
        auto_scaling_group_no: z.string().optional(),
        cluster_uuid: z.string().optional(),
        bucket_name: z.string().optional(),
    })
    .refine(
        (data) => {
            return !!(
                data.server ||
                data.auto_scaling_group_no ||
                data.cluster_uuid ||
                data.bucket_name
            );
        },
        {
            message: 'target_type에 따라 config이 필요합니다.',
        },
    );

export const sourceDeployStageSchema = z.object({
    ...commonSchema,
    project_id: z.string(),
    name: z.string(),
    target_type: z.enum([
        'Server',
        'AutoScalingGroup',
        'KubernetesService',
        'ObjectStorage',
    ]),
    config: configSchema,
});

export type SourceDeployStageSchema = z.infer<typeof sourceDeployStageSchema>;
