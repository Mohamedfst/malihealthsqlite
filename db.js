import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV;
import dbConfig from './db.json' with {type: "json"};
const currentEnv = dbConfig[env];
const db = new sqlite3.Database(`./${currentEnv.data}.db`, (err) => {
    if (err) {
      console.error("Error opening database " + err.message);
    } else {
      db.run(
        "CREATE TABLE HealthCareWorkers( \
              id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
              name TEXT  NOT NULL,\
              middlename TEXT  NOT NULL,\
              lastname TEXT  NOT NULL,\
              dob TEXT  NOT NULL,\
              phone TEXT  NOT NULL,\
              emergencyNumber TEXT  NOT NULL,\
              email TEXT  NOT NULL,\
              address TEXT  NOT NULL,\
              medlicense TEXT  NOT NULL,\
              natlicense TEXT  NOT NULL,\
              languages TEXT  NOT NULL,\
              team TEXT  NOT NULL,\
              center TEXT  NOT NULL,\
              organization TEXT  NOT NULL,\
              role TEXT  NOT NULL,\
              photo BLOB  NOT NULL,\
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL\
          )",
        (err) => {
          if (err) {
            console.log("it already exists");
          }
        }
      );
    }
  });
export default db;  