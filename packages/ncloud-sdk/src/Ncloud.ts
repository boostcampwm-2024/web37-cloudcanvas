import fs from 'fs';
import path from 'path';
import { ApiKeyCredentials } from './types';

export class Ncloud {
    private readonly apiKey: ApiKeyCredentials;

    constructor(arg?: ApiKeyCredentials) {
        if (arg?.accessKey && arg?.secretKey) {
            this.apiKey = arg;
        } else {
            this.apiKey = {};
        }
    }

    private getConfigureFilePath() {
        return path.join(process.cwd(), 'ncloud.config');
    }

    private readConfigureFile(): ApiKeyCredentials {
        const configFilePath = this.getConfigureFilePath();
        if (!fs.existsSync(configFilePath)) {
            console.warn('Configuration file not found at:', configFilePath);
            return {};
        }

        try {
            const configFileData = JSON.parse(
                fs.readFileSync(configFilePath, 'utf-8'),
            );
            return {
                accessKey: configFileData.accessKey ?? undefined,
                secretKey: configFileData.secretKey ?? undefined,
            };
        } catch (error) {
            console.error('Error reading configuration file:', error);
            return {};
        }
    }

    keys() {
        if (this.apiKey.accessKey && this.apiKey.secretKey) {
            return this.apiKey;
        }

        if (
            process.env['NCLOUD_ACCESS_KEY'] &&
            process.env['NCLOUD_SECRET_KEY']
        ) {
            return {
                accessKey: process.env['NCLOUD_ACCESS_KEY'],
                secretKey: process.env['NCLOUD_SECRET_KEY'],
            };
        }

        const config = this.readConfigureFile();
        return {
            accessKey: config.accessKey ?? '',
            secretKey: config.secretKey ?? '',
        };
    }
}
