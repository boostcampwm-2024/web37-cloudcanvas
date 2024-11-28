import { createHmac } from 'crypto';
import { ApiKeyCredentials, RequestConfig } from './types';

interface SignatureConfig extends RequestConfig {
    apiKey: ApiKeyCredentials;
}

export function generateSignature({
    method,
    url,
    timestamp,
    params,
    apiKey,
}: SignatureConfig): string {
    const space = ' ';
    const newLine = '\n';

    const fullUrl = params
        ? `${url}?${new URLSearchParams(params).toString()}`
        : url;

    const message = [
        method,
        space,
        fullUrl,
        newLine,
        timestamp,
        newLine,
        apiKey.accessKey,
    ].join('');

    return createHmac('sha256', apiKey.secretKey)
        .update(message)
        .digest('base64');
}
