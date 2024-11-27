import { PriceApiClient } from './PriceApiClient';
import { ApiKeyCredentials } from './types';
/**
 * Price 관련 API를 직접적으로 호출하는 클래스
 */
export class PriceApi {
    private client: PriceApiClient;
    private readonly resourcePath: string;
    constructor(apiKey?: ApiKeyCredentials) {
        this.resourcePath = '/billing/v1';
        this.client = new PriceApiClient(apiKey);
    }
}
