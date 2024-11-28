import { ResourcePriority } from '../enum/ResourcePriority';

export interface NCloudModel {
    name?: string;
    serviceType: string;
    priority: ResourcePriority;
    getProperties(): { [key: string]: any };
}
