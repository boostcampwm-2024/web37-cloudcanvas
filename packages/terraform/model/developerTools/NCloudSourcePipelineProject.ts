import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { SourcePipelineProject } from '../../interface/developerTools/SourcePipelineProject';

export class NCloudSourcePipelineProject
    implements SourcePipelineProject, NCloudModel
{
    id: string;
    name: string;
    description?: string;
    task: {
        name: string;
        type: 'SourceBuild' | 'SourceDeploy';
        config: {
            projectId: number;
            stageId?: number;
            scenarioId?: number;
            target?: {
                repositoryBranch?: string;
                type?: string;
                repositoryName?: string;
                projectName?: string;
                file?: string;
                manifest?: string;
                fullManifest?: string[];
            };
        };
        linkedTasks: string[];
    }[];
    triggers: {
        repository?: {
            type: 'sourcecommit';
            repositoryName: string;
            branch: string;
        };
        schedule?: {
            day: ('MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN')[];
            time: string;
            timezone: string;
            executeOnlyWithChange: boolean;
        };
        sourcepipeline?: {
            id: number;
            name?: string;
        };
    };
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_sourcepipeline_project';
        this.priority = ResourcePriority.SOURCE_PIPELINE_PROJECT;

        this.name = json.name;
        this.task = json.task;
        this.triggers = json.triggers;
        this.id = json.id || `pipeline-${Date.now()}`;

        if (json.description) this.description = json.description;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
            task: this.task.map((t) => ({
                name: t.name,
                type: t.type,
                config: {
                    project_id: t.config.projectId,
                    stage_id: t.config.stageId,
                    scenario_id: t.config.scenarioId,
                    target: t.config.target,
                },
                linked_tasks: t.linkedTasks,
            })),
            triggers: this.triggers,
        };

        if (this.description) properties.description = this.description;

        return properties;
    }
}
