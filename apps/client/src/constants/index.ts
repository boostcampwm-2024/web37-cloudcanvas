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
        title: 'container',
        items: [
            {
                title: 'Container Registry',
                desc: 'Container Registry',
                type: 'container-registry',
            },
            // {
            //     title: 'Kubernetes',
            //     desc: 'NCloud Kubernetes Service',
            //     type: 'Kubernetes',
            // },
        ],
    },
    {
        title: 'storage',
        items: [
            {
                title: 'Object Storage',
                desc: 'Object Storage',
                type: 'object-storage',
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
            // {
            //     title: 'DB for Redis',
            //     desc: 'Managed Redis database',
            //     type: 'db-redis',
            // },
            // {
            //     title: 'DB for MSSQL',
            //     desc: 'Managed MSSQL database',
            //     type: 'db-mssql',
            // },
            // {
            //     title: 'DB for MongoDB',
            //     desc: 'Managed MongoDB database',
            //     type: 'db-mongo',
            // },
            // {
            //     title: 'DB for PostgreSQL',
            //     desc: 'Managed PostgreSQL database',
            //     type: 'db-postgres',
            // },
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
            { title: 'Nat Gateway', desc: 'nat gateway', type: 'nat-gateway' },
        ],
    },
];
