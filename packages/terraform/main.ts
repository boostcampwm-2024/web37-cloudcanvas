import { TerraformConvertor } from './convertor/TerraformConvertor';
import { saveTerraformFiles } from './util/file';

async function main() {
    try {
        const converter = new TerraformConvertor();
        converter.addResourceFromJson({
            id: 'server1',
            type: 'Server',
            name: 'my-server',
            properties: {
                server_image_number: 'rocky-8.10-base',
                server_spec_code: 's2-g3',
                subnet: 'my-subnet',
                nic: 'my-nic',
                loginKey: 'my-key',
                vpc: 'my-vpc',
                acg: 'my-acg',
                region: 'KR',
            },
        });
        const terraformCode = converter.generate();
        await saveTerraformFiles(terraformCode, { log: true });
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                'Error generating Terraform configuration:',
                error.message,
            );
        } else {
            console.error('An unknown error occurred');
        }
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch(console.error);
}
