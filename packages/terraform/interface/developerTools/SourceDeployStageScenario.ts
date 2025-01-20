interface DeployCommand {
    user: string;
    command: string;
}

interface DeployPath {
    sourcePath: string;
    deployPath: string;
}

interface DeployCommands {
    preDeploy?: DeployCommand;
    path?: DeployPath;
    postDeploy?: DeployCommand;
}

interface SourceBuildConfig {
    id: number;
}

interface ObjectStorageConfig {
    bucket: string;
    object: string;
}

interface FileConfig {
    type: 'SourceBuild' | 'ObjectStorage' | 'later';
    sourceBuild?: SourceBuildConfig;
    objectStorage?: ObjectStorageConfig;
}

interface CanaryMetric {
    name: string;
    successCriteria: 'base' | 'canary';
    weight: number;
    queryType: 'default' | 'promQL';
    metric?: string;
    filter?: string;
    query?: string;
}

interface CanaryAnalysisConfig {
    duration: number;
    delay: number;
    interval: number;
    step: number;
    passScore?: number;
}

interface CanaryConfig {
    analysisType: 'manual' | 'auto';
    canaryCount: number;
    timeout?: number;
    prometheus?: string;
    env?: {
        baseline: string;
        canary: string;
    };
    metrics?: CanaryMetric[];
    analysisConfig?: CanaryAnalysisConfig;
}

export interface SourceDeployStageScenario {
    id: string;
    projectId: string;
    stageId: string;
    name: string;
    description?: string;
    config: {
        strategy: 'normal' | 'blueGreen' | 'rolling' | 'canary';
        file?: FileConfig;
        rollback?: boolean;
        deployCommand?: DeployCommands;
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
        canaryConfig?: CanaryConfig;
        path?: DeployPath;
    };
}
