import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { SourceBuildProject } from '../../interface/developerTools/SourceBuildProject';

export class NCloudSourceBuildProject
    implements SourceBuildProject, NCloudModel
{
    id: string;
    name: string;
    description?: string;
    source: {
        type: 'SourceCommit';
        config: {
            repositoryName: string;
            branch: string;
        };
    };
    env: {
        compute: {
            id: number;
            cpu?: string;
            mem?: string;
        };
        platform: {
            type: 'SourceBuild' | 'ContainerRegistry' | 'PublicRegistry';
            config: {
                os?: {
                    id: number;
                    name?: string;
                    version?: string;
                    archi?: string;
                };
                runtime?: {
                    id: number;
                    name?: string;
                    version: {
                        id: number;
                        name?: string;
                    };
                };
                registry?: string;
                image?: string;
                tag?: string;
            };
        };
        dockerEngine?: {
            use: boolean;
            id?: number;
            name?: string;
        };
        timeout?: number;
        envVar?: {
            key: string;
            value: string;
        }[];
    };
    buildCommand?: {
        preBuild?: string[];
        inBuild?: string[];
        postBuild?: string[];
        dockerImageBuild?: {
            use?: boolean;
            dockerfile?: string;
            registry?: string;
            image?: string;
            tag?: string;
            latest?: boolean;
        };
    };
    artifact?: {
        use: boolean;
        path?: string[];
        objectStorageToUpload?: {
            bucket: string;
            path: string;
            filename: string;
        };
        backup?: boolean;
    };
    buildImageUpload?: {
        use: boolean;
        containerRegistryName?: string;
        imageName?: string;
        tag?: string;
        latest?: boolean;
    };
    linked?: {
        cloudLogAnalytics?: boolean;
        fileSafer?: boolean;
    };
    projectNo?: string;
    lastBuild?: {
        id: string;
        status: string;
        timestamp: string;
    };
    created?: {
        user: string;
        timestamp: string;
    };
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_sourcebuild_project';
        this.priority = ResourcePriority.SOURCE_BUILD_PROJECT;

        this.name = json.name;
        this.source = {
            type: 'SourceCommit',
            config: {
                repositoryName: json.source.config.repositoryName,
                branch: json.source.config.branch,
            },
        };
        this.env = {
            compute: json.env.compute,
            platform: json.env.platform,
        };

        this.id = json.id || `sourcebuild-project-${Date.now()}`;

        if (json.description) this.description = json.description;
        if (json.env.dockerEngine)
            this.env.dockerEngine = json.env.dockerEngine;
        if (json.env.timeout) this.env.timeout = json.env.timeout;
        if (json.env.envVar) this.env.envVar = json.env.envVar;
        if (json.buildCommand) this.buildCommand = json.buildCommand;
        if (json.artifact) this.artifact = json.artifact;
        if (json.buildImageUpload)
            this.buildImageUpload = json.buildImageUpload;
        if (json.linked) this.linked = json.linked;

        if (json.projectNo) this.projectNo = json.projectNo;
        if (json.lastBuild) this.lastBuild = json.lastBuild;
        if (json.created) this.created = json.created;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
            source: {
                type: this.source.type,
                config: {
                    repository_name: this.source.config.repositoryName,
                    branch: this.source.config.branch,
                },
            },
            env: {
                compute: this.env.compute,
                platform: this.env.platform,
            },
        };

        if (this.description) properties.description = this.description;
        if (this.env.dockerEngine)
            properties.env.docker_engine = this.env.dockerEngine;
        if (this.env.timeout) properties.env.timeout = this.env.timeout;
        if (this.env.envVar) properties.env.env_var = this.env.envVar;
        if (this.buildCommand) properties.build_command = this.buildCommand;
        if (this.artifact) properties.artifact = this.artifact;
        if (this.buildImageUpload)
            properties.build_image_upload = this.buildImageUpload;
        if (this.linked) properties.linked = this.linked;

        return properties;
    }
}
