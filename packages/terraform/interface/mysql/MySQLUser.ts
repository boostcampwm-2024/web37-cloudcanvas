interface MySQLUser {
    name: string;
    password: string;
    hostIp: string;
    authority: 'READ' | 'CRUD' | 'DDL';
    isSystemTableAccess?: boolean;
}
