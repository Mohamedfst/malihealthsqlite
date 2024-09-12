import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app/app.js"; 
import db from "../db.js";
import _ from "lodash";
import dbConfig from '../db.json' with {type: "json"};
const testUser = dbConfig.testUser;

chai.use(chaiHttp);


describe("API endpoints", () => {
  beforeEach(async () => {
    await clearDb(); 
  });
  before(async () => {});
  afterEach(async () => {
  });
  

  it("should return all the health care workers", async () => {
    await addNewHcWorker(); 
    const httpResponse = await chai.request(app).get("/hcworkers");
    expectHttpResponseCodeToBe(200, httpResponse);

    let parsedHttpResponse = JSON.parse(httpResponse.text);
    expectHttpResponseToBeHcWorker(testUser,parsedHttpResponse.rows[0]);
  });

  it("should add a new worker", async () => {
    let httpResponse = await addNewHcWorker(); 
    expectHttpResponseCodeToBe(201, httpResponse);

    let parsedHttpResponse = JSON.parse(httpResponse.text);
    expect(parsedHttpResponse.Change_made).to.equal(1);
    expectHttpResponseToBeHcWorker(testUser, parsedHttpResponse.worker_added); // testing the result
    
  });

  it("should return Not Found", async () => {
    const res = await chai.request(app).get("/INVALID_PATH");
    expect(res).to.have.status(404);
  });

  it("should return Bad Request", async () => {
    const res = await chai.request(app).post("/hcworkers").type("form").send({
      color: "YELLOW",
    });
    expect(res).to.have.status(400);
  });
});

async function clearDb() {
  return await db.get("DELETE FROM hcworker");
}

function expectHttpResponseToBeHcWorker(expectedHcWorker, actualWorker) {
  let result = _.isEqual(
    _.omit(actualWorker, ["user_id", "created_at"]),
    _.omit(expectedHcWorker, ["user_id", "created_at"])
  );
  expect(result).to.be.true;
}

function expectHttpResponseCodeToBe(expectedHttpCode, httpResponse) {
  expect(httpResponse).to.have.status(expectedHttpCode);
  expect(httpResponse).to.be.json;
  expect(httpResponse.body).to.be.an("object");
}

async function addNewHcWorker() {
  return await chai.request(app).post("/hcworkers").send(testUser);
  };

