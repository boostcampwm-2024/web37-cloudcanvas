import { z } from 'zod';
import { commonSchema } from '../base';

export const sourceCommitRepositorySchema = z.object({
    ...commonSchema,
    name: z.string().regex(/^[a-zA-Z0-9\-_]+$/, {
        message: 'name은 영문, 숫자, 대시(-), 언더스코어(_)만 입력 가능합니다.',
    }),
    description: z.string().optional(),
    file_safer: z.boolean().optional().default(false),
});

export type SourceCommitRepositorySchema = z.infer<
    typeof sourceCommitRepositorySchema
>;
