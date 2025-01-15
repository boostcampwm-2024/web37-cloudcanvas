import { z } from 'zod';
import { mysqlUserSchema } from './mysqlUser';
import { commonSchema } from '../base';

export const mysqlUsersSchema = z.object({
    ...commonSchema,
    mysql_instance_no: z.string(),
    mysql_user_list: z.array(mysqlUserSchema).min(1),
});

export type MySQLUsersSchema = z.infer<typeof mysqlUsersSchema>;
