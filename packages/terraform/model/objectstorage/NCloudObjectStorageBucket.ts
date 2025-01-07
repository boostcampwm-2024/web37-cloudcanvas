import { ObjectStorageBucket } from '../../interface/ObjectStorageBucket';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudObjectStorageBucket implements ObjectStorageBucket {
    bucketName: string;
    serviceType: string;
    priority: ResourcePriority;
    constructor(json: any) {
        this.serviceType = 'ncloud_objectstorage_bucket';
        this.priority = ResourcePriority.OBJECT_STORAGE_BUCKET;
        this.bucketName = json.bucketName;
    }
    getProperties() {
        return {
            bucket_name: this.bucketName,
        };
    }
}
