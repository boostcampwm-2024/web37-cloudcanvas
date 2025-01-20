export interface SourceCommitRepository {
    id: string;
    name: string;
    description?: string;
    fileSafer?: boolean;
    repositoryNo?: string;
    creator?: string;
    gitHttpsUrl?: string;
    gitSshUrl?: string;
}
