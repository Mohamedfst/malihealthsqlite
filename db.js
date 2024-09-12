import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV;
import dbConfig from './db.json' with {type: "json"};
const currentEnv = dbConfig[env];
console.log(`${currentEnv.data}.db`);
const db = new sqlite3.Database('./hcworkers.db', (err) => {
    if (err) {
      console.error("Error opening database " + err.message);
    } else {
      db.run(
        "CREATE TABLE hcworker( \
              user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
              user_name TEXT  NOT NULL,\
              user_middlename TEXT  NOT NULL,\
              user_lastname TEXT  NOT NULL,\
              user_dob TEXT  NOT NULL,\
              user_phone TEXT  NOT NULL,\
              user_emergencyNumber TEXT  NOT NULL,\
              user_email TEXT  NOT NULL,\
              user_address TEXT  NOT NULL,\
              user_medlicense TEXT  NOT NULL,\
              user_natlicense TEXT  NOT NULL,\
              user_languages TEXT  NOT NULL,\
              user_team TEXT  NOT NULL,\
              user_center TEXT  NOT NULL,\
              user_organization TEXT  NOT NULL,\
              user_role TEXT  NOT NULL,\
              user_photo BLOB  NOT NULL,\
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