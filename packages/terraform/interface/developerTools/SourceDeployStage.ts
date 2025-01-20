interface ServerConfig {
    id: number;
    name?: string;
}

interface Config {
    server?: ServerConfig;
    autoScalingGroupNo?: string;
    autoScalingGroupName?: string;
    clusterUuid?: string;
    clusterName?: string;
    bucketName?: string;
}

export interface SourceDeployStage {
    id: string;
    projectId: string;
    name: string;
    targetType:
        | 'Server'
        | 'AutoScalingGroup'
        | 'KubernetesService'
        | 'ObjectStorage';
    config: Config;
}
