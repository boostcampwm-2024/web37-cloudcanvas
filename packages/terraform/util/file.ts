import { promises as fs } from 'fs';
import { FileOption } from '../interface/FileOption';

export const writeFile = async (
    filePath: string,
    content: string,
    options: FileOption = {},
): Promise<void> => {
    await fs.writeFile(filePath, content);

    if (options.log) {
        console.log(`\nGenerated ${filePath}:`);
        console.log('----------------------------------------');
        console.log(content);
        console.log('----------------------------------------');
    }
};

export const generateVariablesContent = (): string => `
variable "access_key" {
  type = string
}

variable "secret_key" {
  type = string
}

variable "region" {
  type = string
  default = "KR"
}`;

export const generateTfvarsContent = (): string => `
access_key = "your_access_key"
secret_key = "your_secret_key"
region = "KR"`;

export const saveTerraformFiles = async (
    terraformCode: string,
    options: FileOption = {},
): Promise<void> => {
    try {
        await writeFile('main.tf', terraformCode, options);

        const variablesContent = generateVariablesContent();
        await writeFile('variables.tf', variablesContent);

        const tfvarsContent = generateTfvarsContent();
        await writeFile('terraform.tfvars.example', tfvarsContent);

        console.log('\n테라폼 파일 생성 완료');
        console.log('terraform.tfvars 파일을 생성하고 key를 넣어주세요');
    } catch (error) {
        throw new Error(
            `Failed to save Terraform files: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
};
