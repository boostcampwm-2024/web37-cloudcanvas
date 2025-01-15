interface SourceConfig {
    repositoryName: string;
    branch: string;
}

interface ComputeConfig {
    id: number;
    cpu?: string;
    mem?: string;
}

interface RuntimeVersion {
    id: number;
    name?: string;
}

interface Runtime {
    id: number;
    name?: string;
    version: RuntimeVersion;
}

interface OsConfig {
    id: number;
    name?: string;
    version?: string;
    archi?: string;
}

interface PlatformConfig {
    os?: OsConfig;
    runtime?: Runtime;
    registry?: string;
    image?: string;
    tag?: string;
}

interface Platform {
    type: 'SourceBuild' | 'ContainerRegistry' | 'PublicRegistry';
    config: PlatformConfig;
}

interface DockerEngine {
    use: boolean;
    id?: number;
    name?: string;
}

interface EnvVar {
    key: string;
    value: string;
}

interface BuildConfig {
    compute: ComputeConfig;
    platform: Platform;
    dockerEngine?: DockerEngine;
    timeout?: number;
    envVar?: EnvVar[];
}

interface DockerImageBuild {
    use?: boolean;
    dockerfile?: string;
    registry?: string;
    image?: string;
    tag?: string;
    latest?: boolean;
}

interface BuildCommand {
    preBuild?: string[];
    inBuild?: string[];
    postBuild?: string[];
    dockerImageBuild?: DockerImageBuild;
}

interface ObjectStorageUpload {
    bucket: string;
    path: string;
    filename: string;
}

interface Artifact {
    use: boolean;
    path?: string[];
    objectStorageToUpload?: ObjectStorageUpload;
    backup?: boolean;
}

interface BuildImageUpload {
    use: boolean;
    containerRegistryName?: string;
    imageName?: string;
    tag?: string;
    latest?: boolean;
}

interface LinkedServices {
    cloudLogAnalytics?: boolean;
    fileSafer?: boolean;
}

interface LastBuild {
    id: string;
    status: string;
    timestamp: string;
}

export interface SourceBuildProject {
    id: string;
    name: string;
    description?: string;
    source: {
        type: 'SourceCommit';
        config: SourceConfig;
    };
    env: BuildConfig;
    buildCommand?: BuildCommand;
    artifact?: Artifact;
    buildImageUpload?: BuildImageUpload;
    linked?: LinkedServices;
    projectNo?: string;
    lastBuild?: LastBuild;
    created?: {
        user: string;
        timestamp: string;
    };
}
