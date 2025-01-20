import { z } from 'zod';
import { commonSchema } from '../base';

export const initScriptSchema = z.object({
    ...commonSchema,
    content: z.string().regex(/^#!\/[a-zA-Z\/]+.*/, {
        message: 'script는 #!/bin/bash 형식으로 시작해야 합니다',
    }),
    name: z.string().optional(),
    description: z.string().optional(),
    os_type: z.enum(['LNX', 'WND']).optional().default('LNX'),
});

export type InitScriptSchema = z.infer<typeof initScriptSchema>;
