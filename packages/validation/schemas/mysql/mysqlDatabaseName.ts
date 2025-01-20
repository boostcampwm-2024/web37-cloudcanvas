import { z } from 'zod';
import { commonSchema } from '../base';

export const mysqlDatabaseNameSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(30)
        .regex(/^[a-zA-Z][a-zA-Z0-9\_\-]*$/, {
            message:
                'Database name must start with a letter and contain only letters, numbers, underscore, and dash',
        }),
});
