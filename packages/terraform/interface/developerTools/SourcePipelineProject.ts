interface TaskTarget {
    repositoryBranch?: string;
    type?: string;
    repositoryName?: string;
    projectName?: string;
    file?: string;
    manifest?: string;
    fullManifest?: string[];
}

interface TaskConfig {
    projectId: number;
    stageId?: number;
    scenarioId?: number;
    target?: TaskTarget;
}

interface Task {
    name: string;
    type: 'SourceBuild' | 'SourceDeploy';
    config: TaskConfig;
    linkedTasks: string[];
}

interface RepositoryTrigger {
    type: 'sourcecommit';
    repositoryName: string;
    branch: string;
}

interface ScheduleTrigger {
    day: ('MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN')[];
    time: string;
    timezone: string;
    executeOnlyWithChange: boolean;
}

interface SourcePipelineTrigger {
    id: number;
    name?: string;
}

interface Triggers {
    repository?: RepositoryTrigger;
    schedule?: ScheduleTrigger;
    sourcepipeline?: SourcePipelineTrigger;
}

export interface SourcePipelineProject {
    id: string;
    name: string;
    description?: string;
    task: Task[];
    triggers: Triggers;
}
