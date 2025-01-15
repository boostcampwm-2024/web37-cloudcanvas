import { z } from 'zod';
import { commonSchema } from '../base';

const sourceConfigSchema = z.object({
    repository_name: z.string(),
    branch: z.string(),
});

const sourceSchema = z.object({
    type: z.literal('SourceCommit'),
    config: sourceConfigSchema,
});

const computeSchema = z.object({
    id: z.number(),
});

const runtimeVersionSchema = z.object({
    id: z.number(),
});

const runtimeSchema = z.object({
    id: z.number(),
    version: runtimeVersionSchema,
});

const osSchema = z.object({
    id: z.number(),
});

const platformConfigSchema = z.object({
    os: osSchema.optional(),
    runtime: runtimeSchema.optional(),
    registry: z.string().optional(),
    image: z.string().optional(),
    tag: z.string().optional(),
});

const platformSchema = z
    .object({
        type: z.enum(['SourceBuild', 'ContainerRegistry', 'PublicRegistry']),
        config: platformConfigSchema,
    })
    .refine((data) => {
        if (data.type === 'SourceBuild') {
            return !!(data.config.os && data.config.runtime);
        }
        if (
            data.type === 'ContainerRegistry' ||
            data.type === 'PublicRegistry'
        ) {
            return !!(
                data.config.registry &&
                data.config.image &&
                data.config.tag
            );
        }
        return true;
    });

const dockerEngineSchema = z.object({
    use: z.boolean(),
    id: z.number().optional(),
});

const envVarSchema = z.object({
    key: z.string(),
    value: z.string(),
});

const buildEnvSchema = z.object({
    compute: computeSchema,
    platform: platformSchema,
    docker_engine: dockerEngineSchema.optional(),
    timeout: z.number().min(5).max(540).optional().default(60),
    env_var: z.array(envVarSchema).optional(),
});

const dockerImageBuildSchema = z
    .object({
        use: z.boolean().optional().default(false),
        dockerfile: z.string().optional(),
        registry: z.string().optional(),
        image: z.string().optional(),
        tag: z.string().optional(),
        latest: z.boolean().optional().default(false),
    })
    .refine((data) => {
        if (data.use) {
            return !!(
                data.dockerfile &&
                data.registry &&
                data.image &&
                data.tag
            );
        }
        return true;
    });

const buildCommandSchema = z.object({
    pre_build: z.array(z.string().min(1)).optional(),
    in_build: z.array(z.string().min(1)).optional(),
    post_build: z.array(z.string().min(1)).optional(),
    docker_image_build: dockerImageBuildSchema.optional(),
});

const objectStorageUploadSchema = z.object({
    bucket: z.string(),
    path: z.string(),
    filename: z.string(),
});

const artifactSchema = z
    .object({
        use: z.boolean().default(false),
        path: z.array(z.string().min(1)).optional(),
        object_storage_to_upload: objectStorageUploadSchema.optional(),
        backup: z.boolean().optional(),
    })
    .refine((data) => {
        if (data.use) {
            return !!(data.path && data.object_storage_to_upload);
        }
        return true;
    });

const buildImageUploadSchema = z
    .object({
        use: z.boolean().default(false),
        container_registry_name: z.string().optional(),
        image_name: z.string().optional(),
        tag: z.string().optional(),
        latest: z.boolean().optional().default(false),
    })
    .refine((data) => {
        if (data.use) {
            return !!(
                data.container_registry_name &&
                data.image_name &&
                data.tag
            );
        }
        return true;
    });

export const sourceBuildProjectSchema = z.object({
    ...commonSchema,
    name: z.string().regex(/^[a-zA-Z0-9\-_]+$/, {
        message: 'name은 영문, 숫자, 대시(-), 언더스코어(_)만 입력 가능합니다.',
    }),
    description: z.string().optional(),
    source: sourceSchema,
    env: buildEnvSchema,
    build_command: buildCommandSchema.optional(),
    artifact: artifactSchema.optional(),
    build_image_upload: buildImageUploadSchema.optional(),
    linked: z
        .object({
            cloud_log_analytics: z.boolean().optional().default(false),
            file_safer: z.boolean().optional().default(false),
        })
        .optional(),
});

export type SourceBuildProjectSchema = z.infer<typeof sourceBuildProjectSchema>;
