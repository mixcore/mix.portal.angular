export type Database = 'SQLSERVER' | 'MySQL' | 'PostgreSQL' | 'SQLITE';

export const SUPPORTED_DATABASE: Record<Database, { value: Database; label: string }> = {
  SQLSERVER: {
    value: 'SQLSERVER',
    label: 'Microsoft SQL Server'
  },
  MySQL: {
    value: 'MySQL',
    label: 'MySQL Database'
  },
  PostgreSQL: {
    value: 'PostgreSQL',
    label: 'PostgreSQL Database'
  },
  SQLITE: {
    value: 'SQLITE',
    label: 'SQLite Database'
  }
};
