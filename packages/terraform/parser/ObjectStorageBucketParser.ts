import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudObjectStorageBucket } from '../model/NCloudObjectStorageBucket';

export class ObjectStorageBucketParser extends BaseResourceParser {
    protected resourceType = ['object-storage', 'objectstoragebucket'];

    protected validateProperties(properties: any): void {
        if (!properties.bucketName) {
            throw new ValidationError('ObjectStorageBucket', 'bucketName', 'bucket name is required');
        }

        const bucketNameRegex = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
        if (!bucketNameRegex.test(properties.bucketName)) {
            throw new ValidationError(
                'ObjectStorageBucket',
                'bucketName',
                'bucket name must be between 3 and 63 characters long and can contain only lowercase letters, numbers, dots, and hyphens'
            );
        }
    }

    protected createModel(properties: any): NCloudObjectStorageBucket {
        return new NCloudObjectStorageBucket({
            bucketName: properties.bucketName
        });
    }
}
