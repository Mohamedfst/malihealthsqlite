//   const db = await SQLite.openDatabaseAsync('workerList.db');
//   const store = createStore().setTablesSchema({
//       workers: {
//         id: {type: 'string'},
//         name: {type: 'string'},
//         lastName: {type: 'string'},
//         dob: {type: 'string'},
//         phone: {type: 'string'},
//         emergencyNumber: {type: 'string'},
//         email: {type: 'string'},
//         address: {type: 'string'},
//         medLicense: {type: 'string'},
//         natLicense: {type: 'string'},
//         language: {type: 'string'},
//         team: {type: 'string'},
//         center: {type: 'string'},
//         organization: {type: 'string'},
//         role: {type: 'string'},
//         photo: {type: 'string'},
//       },
//     });
 
//     const persister = createExpoSqlitePersister(store, db, {
//       mode: 'tabular',
//       tables: {
//         load: {workers: 'workers'}, save: {workers: 'workers'}
//       },  
//     });

// await persister.startAutoSave();

// await new Promise((resolve) =>
//   db.getAllAsync(`INSERT INTO workers (_id,name, 
//     lastName, dob, phone,emergencyNumber, email,  address,  
//     medLicense,natLicense, language, team, center, organization, role,  
//     photo) VALUES ("4",'Sisi','Keita','01/03/1993','415-640-0262', 
//     '415-640-0262','ergr','fvdf','fgrfew','FEWFE','FDFFGB','FGEWR','fewfGAER',  
//     'dfdf','fdfdffbd','BFEEF')`)
//     .then(resolve),
// );
// await new Promise((resolve) =>
//   db.getAllAsync(`INSERT INTO workers (_id,name, 
//     lastName, dob, phone,emergencyNumber, email,  address,  
//     medLicense,natLicense, language, team, center, organization, role,  
//     photo) VALUES ("5",'Civic','Keita','01/03/1993','415-640-0262', 
//     '415-640-0262','ergr','fvdf','fgrfew','FEWFE','FDFFGB','FGEWR','fewfGAER',  
//     'dfdf','fdfdffbd','BFEEF')`)
//     .then(resolve),
// );


// await persister.startAutoLoad();

// const getLocalDatabase = await new Promise((resolve) =>
//   db.getAllAsync('SELECT * FROM workers;').then(resolve),
// );
// const combinedDatabases = await httpResponseDataRows.concat(getLocalDatabase);

//  return combinedDatabases;