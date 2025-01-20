export interface MySQLSlave {
    id: string;
    mysqlInstanceNo: string;
    subnetNo?: string;
    mysqlServerList?: MySQLServerInfo[];
}
