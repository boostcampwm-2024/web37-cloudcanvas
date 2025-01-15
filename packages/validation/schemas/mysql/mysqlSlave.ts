import { z } from 'zod';
import { commonSchema } from '../base';

export const mysqlSlaveSchema = z.object({
    ...commonSchema,
    mysql_instance_no: z.string(),
    subnet_no: z.string().optional(),
});

export type MySQLSlaveSchema = z.infer<typeof mysqlSlaveSchema>;
