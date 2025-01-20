export interface MySQLDatabase {
    id: string;
    mysqlInstanceNo: string;
    mysqlDatabaseList: {
        name: string;
    }[];
}
