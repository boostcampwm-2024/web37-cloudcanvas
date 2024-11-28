import {
    GetPriceListRequest,
    GetProductCategoryListRequest,
    GetProductListRequest,
    GetProductPriceListRequest,
} from './models';
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

    async getPriceList(getPriceRequest: GetPriceListRequest) {
        const response = await this.client.request({
            method: 'POST',
            url: this.resourcePath + '/product/getPriceList',
            params: getPriceRequest,
        });
        return response.getPriceListResponse;
    }

    async getProductCategoryList(
        getProductCategoryListRequest: GetProductCategoryListRequest,
    ) {
        const response = await this.client.request({
            method: 'POST',
            url: this.resourcePath + '/product/getProductCategoryList',
            params: getProductCategoryListRequest,
        });
        return response.getProductCategoryListResponse;
    }

    async getProductList(getProductListRequest: GetProductListRequest) {
        const response = await this.client.request({
            method: 'POST',
            url: this.resourcePath + '/product/getProductList',
            params: getProductListRequest,
        });
        return response.getProductListResponse;
    }

    async getProductPriceList(
        getProductPriceListRequest: GetProductPriceListRequest,
    ) {
        const response = await this.client.request({
            method: 'POST',
            url: this.resourcePath + '/product/getProductPriceList',
            params: getProductPriceListRequest,
        });
        return response.getProductPriceListResponse;
    }
}
