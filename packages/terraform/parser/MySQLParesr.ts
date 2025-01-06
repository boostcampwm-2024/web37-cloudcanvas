import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudModel } from '../interface/NCloudModel';
import { NCloudMySQL } from '../model/NCloudMySQL';

export class MySQLParesr extends BaseResourceParser {
    protected resourceType = ['db-mysql', 'mysql'];
    private validationRules: MySQLValidationRules[] = [
        {
            fieldName: 'serviceName',
            minLength: 3,
            maxLength: 30,
            required: true,
        },
        {
            fieldName: 'serverNamePrefix',
            minLength: 3,
            maxLength: 20,
            required: true,
        },
        { fieldName: 'userName', minLength: 4, maxLength: 16, required: true },
        {
            fieldName: 'userPassword',
            minLength: 8,
            maxLength: 20,
            required: true,
        },
        { fieldName: 'hostIp', required: true },
        {
            fieldName: 'databaseName',
            minLength: 1,
            maxLength: 30,
            required: true,
        },
    ];

    protected validateProperties(properties: any) {
        for (const rule of this.validationRules) {
            this.validateField(properties, rule);
        }
    }

    protected validateField(properties: any, rule: MySQLValidationRules): void {
        const value = properties[rule.fieldName];

        if (rule.required && !value) {
            throw new ValidationError(
                'MySQL',
                rule.fieldName,
                '필수 속성이 없습니다.',
            );
        }

        if (value && rule.minLength && value.length < rule.minLength) {
            throw new ValidationError(
                'MySQL',
                rule.fieldName,
                '최소 길이보다 짧습니다.',
            );
        }

        if (value && rule.maxLength && value.length > rule.maxLength) {
            throw new ValidationError(
                'MySQL',
                rule.fieldName,
                '최대 길이를 초과했습니다.',
            );
        }
    }

    protected createModel(properties: any): NCloudModel {
        return new NCloudMySQL({
            serviceName: properties.serviceName || 'mysql',
            serverNamePrefix: properties.serverNamePrefix,
            userName: properties.userName,
            userPassword: properties.userPassword,
            hostIp: properties.hostIp,
            databaseName: properties.databaseName,
            subnet: properties.subnet,
            vpc: properties.vpc,
        });
    }
}
