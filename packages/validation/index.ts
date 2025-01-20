import { mysqlSchema } from './schemas/mysql/mysql';

export * from './validator';
export * from './schemas/base';
export * from './schemas/vpc/vpc';
export * from './schemas/vpc/subnet';
export * from './schemas/server/server';
export * from './schemas/mysql/mysql';
export * from './schemas/redis/redis';
export * from './schemas/redis/redisConfigGroup';
export * from './schemas/autoScaling/launchConfiguration';

import { ResourceValidator } from './validator';
import { vpcSchema } from './schemas/vpc/vpc';
import { subnetSchema } from './schemas/vpc/subnet';
import { serverSchema } from './schemas/server/server';
import { redisSchema } from './schemas/redis/redis';
import { redisConfigGroupSchema } from './schemas/redis/redisConfigGroup';
import { launchConfigurationSchema } from './schemas/autoScaling/launchConfiguration';

export function initializeValidation(): void {
    ResourceValidator.registerSchema('vpc', vpcSchema);
    ResourceValidator.registerSchema('subnet', subnetSchema);
    ResourceValidator.registerSchema('server', serverSchema);
    ResourceValidator.registerSchema('mysql', mysqlSchema);
    ResourceValidator.registerSchema('redis', redisSchema);
    ResourceValidator.registerSchema(
        'redisconfiggroup',
        redisConfigGroupSchema,
    );
    ResourceValidator.registerSchema(
        'launchConfiguration',
        launchConfigurationSchema,
    );
}
