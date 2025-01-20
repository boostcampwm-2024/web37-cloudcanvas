import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudSourceDeployStage } from '../../model/developerTools/NCloudSourceDeployStage';

export class SourceDeployStageParser extends BaseResourceParser {
    protected resourceType = ['sourcedeploy_project_stage'];

    protected createModel(properties: any): NCloudSourceDeployStage {
        return new NCloudSourceDeployStage({
            projectId: properties.project_id,
            name: this.getNameOrDefault(properties, 'deploy-stage'),
            targetType: properties.target_type,
            config: {
                server: properties.config.server,
                autoScalingGroupNo: properties.config.auto_scaling_group_no,
                clusterUuid: properties.config.cluster_uuid,
                bucketName: properties.config.bucket_name,
            },
        });
    }
}
