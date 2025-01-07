import { BaseResourceParser } from './BaseResourceParser';
import { NCloudObjectStorageBucket } from '../model/objectstorage/NCloudObjectStorageBucket';

export class ObjectStorageBucketParser extends BaseResourceParser {
    protected resourceType = ['object-storage', 'objectstoragebucket'];

    protected createModel(properties: any): NCloudObjectStorageBucket {
        return new NCloudObjectStorageBucket({
            bucketName: properties.bucketName,
        });
    }
}
