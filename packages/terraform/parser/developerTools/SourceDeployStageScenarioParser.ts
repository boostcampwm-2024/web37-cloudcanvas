import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudSourceDeployStageScenario } from '../../model/developerTools/NCloudSourceDeployStageScenario';

export class SourceDeployStageScenarioParser extends BaseResourceParser {
    protected resourceType = ['sourcedeploy_project_stage_scenario'];

    protected createModel(properties: any): NCloudSourceDeployStageScenario {
        return new NCloudSourceDeployStageScenario({
            projectId: properties.project_id,
            stageId: properties.stage_id,
            name: this.getNameOrDefault(properties, 'stage-scenario'),
            description: properties.description,
            config: {
                strategy: properties.config.strategy,
                file: properties.config.file,
                rollback: properties.config.rollback,
                deployCommand: properties.config.deploy_command,
                loadBalancer: properties.config.load_balancer,
                manifest: properties.config.manifest,
                canaryConfig: properties.config.canary_config,
                path: properties.config.path,
            },
        });
    }
}
