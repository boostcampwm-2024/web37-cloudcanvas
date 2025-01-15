import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { SourceDeployProject } from '../../interface/developerTools/SourceDeployProject';

export class NCloudSourceDeployProject
    implements SourceDeployProject, NCloudModel
{
    id: string;
    name: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_sourcedeploy_project';
        this.priority = ResourcePriority.SOURCE_DEPLOY_PROJECT;

        this.name = json.name;

        this.id = json.id || `sourcedeploy-project-${Date.now()}`;
    }

    getProperties() {
        return {
            name: this.name,
        };
    }
}
