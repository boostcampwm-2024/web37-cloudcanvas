interface NetworkRule {
    protocol: 'TCP' | 'UDP' | 'ICMP';
    ipBlock?: string;
    sourceAccessControlGroupNo?: string;
    portRange?: string;
    description?: string;
}
