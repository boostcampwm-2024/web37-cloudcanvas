import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { SourceDeployStageScenario } from '../../interface/developerTools/SourceDeployStageScenario';

export class NCloudSourceDeployStageScenario
    implements SourceDeployStageScenario, NCloudModel
{
    id: string;
    projectId: string;
    stageId: string;
    name: string;
    description?: string;
    config: {
        strategy: 'normal' | 'blueGreen' | 'rolling' | 'canary';
        file?: {
            type: 'SourceBuild' | 'ObjectStorage' | 'later';
            sourceBuild?: {
                id: number;
            };
            objectStorage?: {
                bucket: string;
                object: string;
            };
        };
        rollback?: boolean;
        deployCommand?: {
            preDeploy?: {
                user: string;
                command: string;
            };
            path?: {
                sourcePath: string;
                deployPath: string;
            };
            postDeploy?: {
                user: string;
                command: string;
            };
        };
        loadBalancer?: {
            loadBalancerTargetGroupNo: string;
            deleteServer: boolean;
            loadBalancerTargetGroupName?: string;
        };
        manifest?: {
            type: 'SourceCommit';
            repositoryName: string;
            branch: string;
            path: string;
        };
        canaryConfig?: {
            analysisType: 'manual' | 'auto';
            canaryCount: number;
            timeout?: number;
            prometheus?: string;
            env?: {
                baseline: string;
                canary: string;
            };
            metrics?: {
                name: string;
                successCriteria: 'base' | 'canary';
                weight: number;
                queryType: 'default' | 'promQL';
                metric?: string;
                filter?: string;
                query?: string;
            }[];
            analysisConfig?: {
                duration: number;
                delay: number;
                interval: number;
                step: number;
                passScore?: number;
            };
        };
        path?: {
            sourcePath: string;
            deployPath: string;
        };
    };
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_sourcedeploy_project_stage_scenario';
        this.priority = ResourcePriority.SOURCE_DEPLOY_STAGE_SCENARIO;

        this.projectId = json.projectId;
        this.stageId = json.stageId;
        this.name = json.name;
        this.config = json.config;
        this.id = json.id || `stage-scenario-${Date.now()}`;

        if (json.description) this.description = json.description;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            project_id: this.projectId,
            stage_id: this.stageId,
            name: this.name,
            config: this.config,
        };

        if (this.description) properties.description = this.description;

        return properties;
    }
}
