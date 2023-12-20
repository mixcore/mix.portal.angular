export const mixDbDocumentJsonGenerator = (dbName: string) => {
  return {
    getList: {
      method: 'get',
      title: `List ${dbName} records`,
      path: `/api/v2/rest/mix-portal/mix-db/${dbName}`,
    },
    filterList: {
      method: 'post',
      title: `List ${dbName} records`,
      path: `/api/v2/rest/mix-portal/mix-db/${dbName}/filter`,
    },
    updateById: {
      method: 'post',
      title: `Update ${dbName} record by id`,
      path: `/api/v2/rest/mix-portal/mix-db/${dbName}/{id}`,
    },
    patchById: {
      method: 'patch',
      title: `Patch ${dbName} record by id`,
      path: `/api/v2/rest/mix-portal/mix-db/${dbName}/{id}`,
    },
    deleteById: {
      method: 'delete',
      title: `Delete ${dbName} record by id`,
      path: `/api/v2/rest/mix-portal/mix-db/${dbName}/{id}`,
    },
  };
};
