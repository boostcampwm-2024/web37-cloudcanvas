import { z } from 'zod';
import { commonSchema } from '../base';

const deployCommandSchema = z.object({
    user: z.string(),
    command: z.string(),
});

const deployPathSchema = z.object({
    source_path: z.string(),
    deploy_path: z.string(),
});

const sourceBuildConfigSchema = z.object({
    id: z.number(),
});

const objectStorageConfigSchema = z.object({
    bucket: z.string(),
    object: z.string(),
});

const fileConfigSchema = z
    .object({
        type: z.enum(['SourceBuild', 'ObjectStorage', 'later']),
        source_build: sourceBuildConfigSchema.optional(),
        object_storage: objectStorageConfigSchema.optional(),
    })
    .refine((data) => {
        if (data.type === 'SourceBuild') return !!data.source_build;
        if (data.type === 'ObjectStorage') return !!data.object_storage;
        return true;
    });

const canaryMetricSchema = z
    .object({
        name: z.string(),
        success_criteria: z.enum(['base', 'canary']),
        weight: z.number(),
        query_type: z.enum(['default', 'promQL']),
        metric: z.string().optional(),
        filter: z.string().optional(),
        query: z.string().optional(),
    })
    .refine((data) => {
        if (data.query_type === 'default')
            return !!(data.metric && data.filter);
        return !!data.query;
    });

const canaryConfigSchema = z
    .object({
        analysis_type: z.enum(['manual', 'auto']),
        canary_count: z.number(),
        timeout: z.number().optional(),
        prometheus: z.string().optional(),
        env: z
            .object({
                baseline: z.string(),
                canary: z.string(),
            })
            .optional(),
        metrics: z.array(canaryMetricSchema).optional(),
        analysis_config: z
            .object({
                duration: z.number(),
                delay: z.number(),
                interval: z.number(),
                step: z.number(),
                pass_score: z.number().optional(),
            })
            .optional(),
    })
    .refine((data) => {
        if (data.analysis_type === 'manual') return !!data.timeout;
        return !!(
            data.prometheus &&
            data.env &&
            data.metrics &&
            data.analysis_config
        );
    });

export const sourceDeployStageScenarioSchema = z.object({
    ...commonSchema,
    project_id: z.string(),
    stage_id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    config: z.object({
        strategy: z.enum(['normal', 'blueGreen', 'rolling', 'canary']),
        file: fileConfigSchema.optional(),
        rollback: z.boolean().optional(),
        deploy_command: z
            .object({
                pre_deploy: deployCommandSchema.optional(),
                path: deployPathSchema.optional(),
                post_deploy: deployCommandSchema.optional(),
            })
            .optional(),
        load_balancer: z
            .object({
                load_balancer_target_group_no: z.string(),
                delete_server: z.boolean(),
            })
            .optional(),
        manifest: z
            .object({
                type: z.literal('SourceCommit'),
                repository_name: z.string(),
                branch: z.string(),
                path: z.string(),
            })
            .optional(),
        canary_config: canaryConfigSchema.optional(),
        path: deployPathSchema.optional(),
    }),
});

export type SourceDeployStageScenarioSchema = z.infer<
    typeof sourceDeployStageScenarioSchema
>;
