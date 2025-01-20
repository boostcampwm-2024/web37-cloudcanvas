import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudSourceBuildProject } from '../../model/developerTools/NCloudSourceBuildProject';

export class SourceBuildProjectParser extends BaseResourceParser {
    protected resourceType = ['sourcebuild_project'];

    protected createModel(properties: any): NCloudSourceBuildProject {
        return new NCloudSourceBuildProject({
            name: this.getNameOrDefault(properties, 'build-project'),
            description: properties.description,
            source: {
                type: 'SourceCommit',
                config: {
                    repositoryName: properties.source.config.repository_name,
                    branch: properties.source.config.branch,
                },
            },
            env: {
                compute: properties.env.compute,
                platform: properties.env.platform,
                dockerEngine: properties.env.docker_engine,
                timeout: properties.env.timeout,
                envVar: properties.env.env_var,
            },
            buildCommand: properties.build_command && {
                preBuild: properties.build_command.pre_build,
                inBuild: properties.build_command.in_build,
                postBuild: properties.build_command.post_build,
                dockerImageBuild: properties.build_command.docker_image_build,
            },
            artifact: properties.artifact,
            buildImageUpload: properties.build_image_upload,
            linked: properties.linked,
        });
    }
}
