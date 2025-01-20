export interface LaunchConfiguration {
    id: string;
    name?: string;
    serverImageProductCode?: string;
    serverProductCode?: string;
    memberServerImageNo?: string;
    loginKeyName?: string;
    initScriptNo?: string;
    userData?: string;
    accessControlGroupNoList?: string[];
    isEncryptedVolume?: boolean;
}
