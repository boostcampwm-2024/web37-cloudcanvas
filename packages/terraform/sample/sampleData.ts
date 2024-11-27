import { CloudCanvasNode } from '../interface/CloudCanvasNode';

export const sampleNodes: CloudCanvasNode[] = [
    {
        id: 'nacl1',
        type: 'NetworkACL',
        name: 'my-nacl',
        properties: {
            vpcName: 'my-vpc',
            region: 'KR',
        },
    },
    {
        id: 'server1',
        type: 'Server',
        name: 'my-server',
        properties: {
            server_image_product_code: 'SW.VSVR.OS.LNX64.CNTOS.0708.B050',
            server_product_code: 'SVR.VSVR.HICPU.C002.M004.NET.HDD.B050.G002',
            subnetName: 'my-subnet',
            nicName: 'my-nic',
            loginKeyName: 'my-key',
            vpcName: 'my-vpc',
            acgName: 'my-acg',
            region: 'KR',
        },
    },
    {
        id: 'publicip1',
        type: 'PublicIP',
        name: 'my-public-ip',
        properties: {
            serverName: 'my-server',
            region: 'KR',
        },
    },
    // {
    //     id: 'lb1',
    //     type: 'LoadBalancer',
    //     name: 'my-lb',
    //     properties: {
    //         type: 'APPLICATION',
    //         networkType: 'PUBLIC',
    //         throughputType: 'SMALL',
    //         description: 'My Load Balancer',
    //     },
    // },
    // {
    //     id: 'lc1',
    //     type: 'LaunchConfiguration',
    //     name: 'my-lc',
    //     properties: {
    //         serverImageProductCode: 'SW.VSVR.OS.LNX64.CNTOS.0703.B050',
    //         serverProductCode: 'SVR.VSVR.HICPU.C002.M004.NET.SSD.B050.G002',
    //         loginKeyName: 'my-key',
    //         isEncryptedVolume: false,
    //     },
    // },
    // {
    //     id: 'mysql1',
    //     type: 'MySQL',
    //     name: 'my-mysql',
    //     properties: {
    //         serverNamePrefix: 'mysql',
    //         userName: 'admin',
    //         userPassword: 'Password1!',
    //         hostIp: '192.168.0.1',
    //         databaseName: 'mydb',
    //     },
    // },
];
