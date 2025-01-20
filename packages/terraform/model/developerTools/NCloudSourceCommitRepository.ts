import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { SourceCommitRepository } from '../../interface/developerTools/SourceCommitRepository';

export class NCloudSourceCommitRepository
    implements SourceCommitRepository, NCloudModel
{
    id: string;
    name: string;
    description?: string;
    fileSafer?: boolean;
    repositoryNo?: string;
    creator?: string;
    gitHttpsUrl?: string;
    gitSshUrl?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_sourcecommit_repository';
        this.priority = ResourcePriority.SOURCE_COMMIT_REPOSITORY;

        this.name = json.name;

        this.id = json.id || `sourcecommit-repo-${Date.now()}`;

        if (json.description) this.description = json.description;
        if (json.fileSafer !== undefined) this.fileSafer = json.fileSafer;

        if (json.repositoryNo) this.repositoryNo = json.repositoryNo;
        if (json.creator) this.creator = json.creator;
        if (json.gitHttpsUrl) this.gitHttpsUrl = json.gitHttpsUrl;
        if (json.gitSshUrl) this.gitSshUrl = json.gitSshUrl;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
        };

        if (this.description) properties.description = this.description;
        if (this.fileSafer !== undefined)
            properties.file_safer = this.fileSafer;

        return properties;
    }
}
