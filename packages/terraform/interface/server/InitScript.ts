export interface InitScript {
    id: string;
    content: string;
    name?: string;
    description?: string;
    osType?: 'LNX' | 'WND';
    initScriptNo?: string;
}