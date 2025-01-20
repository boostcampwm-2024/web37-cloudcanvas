import { z } from 'zod';
import { commonSchema } from '../base';
import { mysqlDatabaseNameSchema } from './mysqlDatabaseName';

export const mysqlDatabasesSchema = z.object({
    ...commonSchema,
    mysql_instance_no: z.string(),
    mysql_database_list: z.array(mysqlDatabaseNameSchema).min(1),
});

export type MySQLDatabasesSchema = z.infer<typeof mysqlDatabasesSchema>;
