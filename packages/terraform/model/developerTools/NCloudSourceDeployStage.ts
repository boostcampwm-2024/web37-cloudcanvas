import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { SourceDeployStage } from '../../interface/developerTools/SourceDeployStage';

export class NCloudSourceDeployStage implements SourceDeployStage, NCloudModel {
    id: string;
    projectId: string;
    name: string;
    targetType:
        | 'Server'
        | 'AutoScalingGroup'
        | 'KubernetesService'
        | 'ObjectStorage';
    config: {
        server?: {
            id: number;
            name?: string;
        };
        autoScalingGroupNo?: string;
        autoScalingGroupName?: string;
        clusterUuid?: string;
        clusterName?: string;
        bucketName?: string;
    };
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_sourcedeploy_project_stage';
        this.priority = ResourcePriority.SOURCE_DEPLOY_STAGE;

        this.projectId = json.projectId;
        this.name = json.name;
        this.targetType = json.targetType;
        this.config = {};
        this.id = json.id || `deploy-stage-${Date.now()}`;

        switch (this.targetType) {
            case 'Server':
                this.config.server = {
                    id: json.config.server.id,
                    name: json.config.server.name,
                };
                break;
            case 'AutoScalingGroup':
                this.config.autoScalingGroupNo = json.config.autoScalingGroupNo;
                this.config.autoScalingGroupName =
                    json.config.autoScalingGroupName;
                break;
            case 'KubernetesService':
                this.config.clusterUuid = json.config.clusterUuid;
                this.config.clusterName = json.config.clusterName;
                break;
            case 'ObjectStorage':
                this.config.bucketName = json.config.bucketName;
                break;
        }
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            project_id: this.projectId,
            name: this.name,
            target_type: this.targetType,
            config: {},
        };

        switch (this.targetType) {
            case 'Server':
                properties.config.server = {
                    id: this.config.server?.id,
                };
                break;
            case 'AutoScalingGroup':
                properties.config.auto_scaling_group_no =
                    this.config.autoScalingGroupNo;
                break;
            case 'KubernetesService':
                properties.config.cluster_uuid = this.config.clusterUuid;
                break;
            case 'ObjectStorage':
                properties.config.bucket_name = this.config.bucketName;
                break;
        }

        return properties;
    }
}
