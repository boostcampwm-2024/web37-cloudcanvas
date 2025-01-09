import { ObjectStorageBucket } from '../../interface/objectStorage/ObjectStorageBucket';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';

export class NCloudObjectStorageBucket implements ObjectStorageBucket, NCloudModel {
    bucketName: string;
    creationDate?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_objectstorage_bucket';
        this.priority = ResourcePriority.OBJECT_STORAGE_BUCKET;
        this.bucketName = json.bucketName;
        if (json.creationDate) this.creationDate = json.creationDate;
    }

    getProperties() {
        return {
            bucket_name: this.bucketName,
        };
    }
}
