export interface ApiKeyCredentials {
    accessKey?: string;
    secretKey?: string;
}

export interface RequestConfig {
    method: string;
    url: string;
    timestamp: number;
    params?: Record<string, any>;
}
