import { mysqlSchema } from './schemas/mysql';

export * from './validator';
export * from './schemas/base';
export * from './schemas/vpc';
export * from './schemas/subnet';
export * from './schemas/server';
export * from './schemas/mysql';
export * from './schemas/redis';
export * from './schemas/redisConfigGroup';
export * from './schemas/launchConfiguration';

import { ResourceValidator } from './validator';
import { vpcSchema } from './schemas/vpc';
import { subnetSchema } from './schemas/subnet';
import { serverSchema } from './schemas/server';
import { redisSchema } from './schemas/redis';
import { redisConfigGroupSchema } from './schemas/redisConfigGroup';
import { launchConfigurationSchema } from './schemas/launchConfiguration';

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
