import express from "express";
import bodyParser from "body-parser";
import db from "../db.js";
const app = express();
app.use(bodyParser.json());

app.get("/hcworkers", (req, res) => {
  let selectQuery = "SELECT * FROM healthCareWorkers";
  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ rows });
  });
});

app.get("/hcworkerlist", (req, res) => {
  console.log("Inside the get route");
  let selectQuery = "SELECT * FROM healthCareWorkers";
  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    let workerById = {};
    for (let key in rows) {
      let row = rows[key];
      workerById[row.id] = row;
    }

    let workersList = [
      {
        workers: workerById,
      },
    ];

    res.status(200).json(workersList);
  });
});

app.post("/hcworkerlist/", (req, res) => {
  console.log("inside post hcworkerlist");

  let insertedValues;
  let reqBody;
  let insert;
  console.log();
  if (
    req.body &&
    req.body.length > 0 &&
    req.body[0].workers &&
    Object.keys(req.body[0].workers).length
  ) {
    console.log("Inside the if statement");
    console.log("Request Body", req.body[0].workers);
    for (let key in req.body[0].workers) {
      let row = req.body[0].workers[key];
      reqBody = row;
      insertedValues = [
        reqBody.name,
        reqBody.middlename,
        reqBody.lastname,
        reqBody.dob,
        reqBody.phone,
        reqBody.emergencyNumber,
        reqBody.email,
        reqBody.address,
        reqBody.medlicense,
        reqBody.natlicense,
        reqBody.languages,
        reqBody.team,
        reqBody.center,
        reqBody.organization,
        reqBody.role,
        reqBody.photo,
      ];
      insert =
        "INSERT INTO healthCareWorkers (name, middlename, lastname, dob,phone,emergencyNumber,email,address,medlicense,natlicense,languages,team,center,organization,role,photo) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?)";
      db.run(insert, insertedValues, function (err, result) {
        if (err) {
          console.log(insertedValues);
          console.log(err.message);
          return;
        }
      });
    }
  } else {
    reqBody = req.body;
    insertedValues = [
      reqBody.name,
      reqBody.middlename,
      reqBody.lastname,
      reqBody.dob,
      reqBody.phone,
      reqBody.emergencyNumber,
      reqBody.email,
      reqBody.address,
      reqBody.medlicense,
      reqBody.natlicense,
      reqBody.languages,
      reqBody.team,
      reqBody.center,
      reqBody.organization,
      reqBody.role,
      reqBody.photo,
    ];
    insert =
      "INSERT INTO healthCareWorkers (name, middlename, lastname, dob,phone,emergencyNumber,email,address,medlicense,natlicense,languages,team,center,organization,role,photo) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?)";
    db.run(insert, insertedValues, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({
        worker_id: this.lastID,
        Change_made: this.changes,
        worker_added: reqBody,
      });
    });
  }
});

app.post("/hcworkers/", (req, res) => {
  let reqBody = req.body;
  let insert =
    "INSERT INTO healthCareWorkers (name, middlename, lastname, dob,phone,emergencyNumber,email,address,medlicense,natlicense,languages,team,center,organization,role,photo) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?)";
  let insertedValues = [
    reqBody.name,
    reqBody.middlename,
    reqBody.lastname,
    reqBody.dob,
    reqBody.phone,
    reqBody.emergencyNumber,
    reqBody.email,
    reqBody.address,
    reqBody.medlicense,
    reqBody.natlicense,
    reqBody.languages,
    reqBody.team,
    reqBody.center,
    reqBody.organization,
    reqBody.role,
    reqBody.photo,
  ];
  db.run(insert, insertedValues, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({
      worker_id: this.lastID,
      Change_made: this.changes,
      worker_added: reqBody,
    });
  });
});
export default app;
