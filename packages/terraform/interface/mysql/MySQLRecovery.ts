import { MySQLServerInfo } from './MySQLServerInfo';

export interface MySQLRecovery {
    id: string;
    mysqlInstanceNo: string;
    recoveryServerName: string;
    subnetNo?: string;
    fileName?: string;
    recoveryTime?: string;
    mysqlServerList?: MySQLServerInfo[];
}
