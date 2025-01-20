interface IpAcl {
    action: 'allow' | 'deny';
    address: string;
    comment?: string;
}
