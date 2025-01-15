import { commonSchema } from '../base';
import { z } from 'zod';

export const objectStorageBucketSchema = z.object({
    ...commonSchema,
    bucket_name: z
        .string()
        .min(3)
        .max(63)
        .regex(/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/, {
            message:
                'bucket name은 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다',
        })
        .refine((name) => !name.includes('..'), {
            message: 'bucket name에 연속된 점은 사용할 수 없습니다',
        }),
});

export type ObjectStorageBucketSchema = z.infer<
    typeof objectStorageBucketSchema
>;
