import { z } from 'zod';
import { commonSchema } from '../base';

const taskSchema = z.object({
    name: z.string(),
    type: z.enum(['SourceBuild', 'SourceDeploy']),
    config: z.object({
        project_id: z.number(),
        stage_id: z.number().optional(),
        scenario_id: z.number().optional(),
        target: z
            .object({
                repository_branch: z.string().optional(),
            })
            .optional(),
    }),
    linked_tasks: z.array(z.string()),
});

const triggersSchema = z.object({
    repository: z
        .object({
            type: z.literal('sourcecommit'),
            repository_name: z.string(),
            branch: z.string(),
        })
        .optional(),
    schedule: z
        .object({
            day: z.array(
                z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']),
            ),
            time: z.string(),
            timezone: z.string(),
            execute_only_with_change: z.boolean(),
        })
        .optional(),
    sourcepipeline: z
        .object({
            id: z.number(),
        })
        .optional(),
});

export const sourcePipelineProjectSchema = z.object({
    ...commonSchema,
    name: z.string(),
    description: z.string().optional(),
    task: z.array(taskSchema),
    triggers: triggersSchema,
});

export type SourcePipelineProjectSchema = z.infer<
    typeof sourcePipelineProjectSchema
>;
