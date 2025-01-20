import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudSourcePipelineProject } from '../../model/developerTools/NCloudSourcePipelineProject';

export class SourcePipelineProjectParser extends BaseResourceParser {
    protected resourceType = ['sourcepipeline_project'];

    protected createModel(properties: any): NCloudSourcePipelineProject {
        return new NCloudSourcePipelineProject({
            name: this.getNameOrDefault(properties, 'pipeline'),
            description: properties.description,
            task: properties.task.map((t: any) => ({
                name: t.name,
                type: t.type,
                config: {
                    projectId: t.config.project_id,
                    stageId: t.config.stage_id,
                    scenarioId: t.config.scenario_id,
                    target: t.config.target,
                },
                linkedTasks: t.linked_tasks,
            })),
            triggers: {
                repository: properties.triggers.repository,
                schedule: properties.triggers.schedule,
                sourcepipeline: properties.triggers.sourcepipeline,
            },
        });
    }
}
