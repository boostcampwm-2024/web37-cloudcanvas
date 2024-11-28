import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from 'axios';
import { generateSignature } from '../../signature';
import { ApiKeyCredentials } from '../../types';

export class PriceApiClient {
    private readonly baseURL: string;
    private readonly apiKey?: ApiKeyCredentials;
    private readonly axiosInstance: AxiosInstance;

    constructor(apiKey?: ApiKeyCredentials) {
        const apiGwEndpoint =
            process.env.NCLOUD_API_GW || 'https://billingapi.apigw.ntruss.com';
        this.baseURL = apiGwEndpoint;
        this.apiKey = apiKey;

        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            timeout: 60000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        this.setupRequestInterceptor();
    }

    private setupRequestInterceptor(): void {
        this.axiosInstance.interceptors.request.use((config) => {
            const timestamp = Date.now();

            const params = {
                ...config.params,
            };

            if (this.apiKey) {
                const signature = generateSignature({
                    method: config.method?.toUpperCase() || 'GET',
                    url: config?.url ?? '',
                    timestamp,
                    params,
                    apiKey: this.apiKey,
                });
                if (config.headers instanceof AxiosHeaders) {
                    config.headers.set('x-ncp-apigw-timestamp', timestamp);
                    config.headers.set(
                        'x-ncp-iam-access-key',
                        this.apiKey.accessKey,
                    );
                    config.headers.set('x-ncp-apigw-signature-v2', signature);
                }
            }
            config.params = params;
            config.responseType = 'json';
            return config;
        });
    }

    async request(config: AxiosRequestConfig): Promise<any> {
        try {
            const response = await this.axiosInstance.request({
                ...config,
                params: {
                    ...config.params,
                    responseFormatType: 'json',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('API Error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                });
                throw new Error(error.response?.data?.message || error.message);
            }
            throw error;
        }
    }
}
