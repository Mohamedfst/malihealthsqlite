import express from "express";
import bodyParser from "body-parser";
import db from "../db.js";
const app = express();
app.use(bodyParser.json());

app.get("/hcworkers", (req, res) => {
  let selectQuery = "SELECT * FROM hcworker";
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
    "INSERT INTO hcworker (user_name, user_middlename, user_lastname, user_dob,user_phone,user_emergencyNumber,user_email,user_address,user_medlicense,user_natlicense,user_languages,user_team,user_center,user_organization,user_role,user_photo) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?)";
  let insertedValues = [
    reqBody.user_name,
    reqBody.user_middlename,
    reqBody.user_lastname,
    reqBody.user_dob,
    reqBody.user_phone,
    reqBody.user_emergencyNumber,
    reqBody.user_email,
    reqBody.user_address,
    reqBody.user_medlicense,
    reqBody.user_natlicense,
    reqBody.user_languages,
    reqBody.user_team,
    reqBody.user_center,
    reqBody.user_organization,
    reqBody.user_role,
    reqBody.user_photo,
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
