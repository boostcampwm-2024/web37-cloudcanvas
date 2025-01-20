import { CmakConfig } from './CmakConfig';
import { NodeConfig } from './NodeConfig';

export interface CdssCluster {
    id: string;
    name: string;
    kafkaVersionCode: string;
    configGroupNo: string;
    vpcNo: string;
    osImage: string;
    cmak: CmakConfig;
    managerNode: NodeConfig;
    brokerNodes: NodeConfig;
    endpoints?: {
        plaintext?: string[];
        tls?: string[];
        publicEndpointPlaintext?: string[];
        publicEndpointPlaintextListenerPort?: string[];
        publicEndpointTls?: string[];
        publicEndpointTlsListenerPort?: string[];
        hostsPrivateEndpointTls?: string[];
        hostsPublicEndpointTls?: string[];
        zookeeper?: string[];
    };
}
