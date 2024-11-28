export const GRID_2D_SIZE = 90;
export const GRID_3D_WIDTH_SIZE = 128;
export const GRID_3D_HEIGHT_SIZE = 74;
export const NODE_BASE_SIZE = {
    '2d': { width: 90, height: 90 },
    '3d': { width: 128, height: 111 },
};

export const NCLOUD_SERVICES = [
    {
        title: 'compute',
        items: [
            {
                title: 'Compute Server',
                desc: 'Compute server instances',
                type: 'server',
            },
            {
                title: 'Cloud Functions',
                desc: 'Serverless functions',
                type: 'cloud-function',
            },
        ],
    },
    {
        title: 'database',
        items: [
            {
                title: 'DB for MySQL',
                desc: 'Managed MySQL database',
                type: 'db-mysql',
            },
        ],
    },
    {
        title: 'networks',
        items: [
            {
                title: 'Load Balancer',
                desc: 'load balancing',
                type: 'load-balancer',
            },
        ],
    },
];

export const NETWORKS_CATEGORIES = [
    'region',
    'vpc',
    'subnet',
    // 'security-group',
];
