import { z } from 'zod';
import { commonSchema } from './base';

export const mysqlDatabaseNameSchema = z.object({
    name: z.string()
        .min(1)
        .max(30)
        .regex(/^[a-zA-Z][a-zA-Z0-9\_\-]*$/, {
            message: 'Database name must start with a letter and contain only letters, numbers, underscore, and dash',
        }),
});

export const mysqlDatabasesSchema = z.object({
    ...commonSchema,
    mysql_instance_no: z.string(),
    mysql_database_list: z.array(mysqlDatabaseNameSchema)
        .min(1),
});

export const mysqlRecoverySchema = z.object({
    ...commonSchema,
    mysql_instance_no: z.string(),
    recovery_server_name: z.string()
        .min(3)
        .max(25)
        .regex(/^[a-z][a-z0-9\-]*[a-zA-Z0-9]$/, {
            message: 'Server name must start with a lowercase letter and end with a letter or number',
        }),
    subnet_no: z.string().optional(),
    file_name: z.string().optional(),
    recovery_time: z.string().optional(),
}).refine((data) => {
    return !!(data.file_name || data.recovery_time);
}, {
    message: 'Either file_name or recovery_time must be provided',
    path: ['recovery_info'],
});

export type MySQLDatabasesSchema = z.infer<typeof mysqlDatabasesSchema>;
export type MySQLRecoverySchema = z.infer<typeof mysqlRecoverySchema>;