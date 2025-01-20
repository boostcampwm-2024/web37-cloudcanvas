import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudSourceDeployProject } from '../../model/developerTools/NCloudSourceDeloyProject';

export class SourceDeployProjectParser extends BaseResourceParser {
    protected resourceType = ['sourcedeploy_project'];

    protected createModel(properties: any): NCloudSourceDeployProject {
        return new NCloudSourceDeployProject({
            name: this.getNameOrDefault(properties, 'deploy-project'),
        });
    }
}
