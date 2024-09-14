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
