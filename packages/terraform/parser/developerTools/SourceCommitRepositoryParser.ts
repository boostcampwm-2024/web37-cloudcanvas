import { NCloudSourceCommitRepository } from '../../model/developerTools/NCloudSourceCommitRepository';
import { BaseResourceParser } from '../BaseResourceParser';

export class SourceCommitRepositoryParser extends BaseResourceParser {
    protected resourceType = ['sourcecommit_repository'];

    protected createModel(properties: any): NCloudSourceCommitRepository {
        return new NCloudSourceCommitRepository({
            name: this.getNameOrDefault(properties, 'repository'),
            description: properties.description,
            fileSafer: properties.file_safer,
        });
    }
}
