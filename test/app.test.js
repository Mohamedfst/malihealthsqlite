import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app/app.js"; 
import db from "../db.js";
import _ from "lodash";

chai.use(chaiHttp);

const testUser = {
  user_id: "2323432",
  user_name: "testusermocha",
  user_middlename: "",
  user_lastname: "Keita",
  user_dob: "01/03/3000",
  user_phone: "510-282-4142",
  user_emergencyNumber: "415-640-0262",
  user_email: "testusermocha@malimail.com",
  user_address: "hdkdpw8*sWkL!NSkpEq",
  user_medlicense: "Q23qrd07",
  user_natlicense: "US032489",
  user_languages: "English, Spanish",
  user_team: "Community Worker",
  user_center: "Concord CSCOM",
  user_organization: "CSCOM",
  user_role: "Care Provider",
  user_photo: "Ariel Photo",
  created_at: "2010-04-21",
};

describe("API endpoints", () => {
  beforeEach(async () => {
    const result = await db.get("DELETE FROM hcworker"); 
  });
  before(async () => {});
  afterEach(async () => {
  });
  
  // GET - List all health care workers
  it("should return all the health care workers", async () => {
    await addNewHcWorker(); 
    const httpResponse = await chai.request(app).get("/hcworkers");
    expectHttpResponseCodeToBe(200, httpResponse);

    let parsedHttpResponse = JSON.parse(httpResponse.text);
    expectHttpResponseToBeHcWorker(testUser,parsedHttpResponse.rows[0]);
  });

  // POST - Add new worker
  it("should add a new worker", async () => {
    let httpResponse = await addNewHcWorker(); 
    expectHttpResponseCodeToBe(201, httpResponse);

    let parsedHttpResponse = JSON.parse(httpResponse.text);
    expect(parsedHttpResponse.Change_made).to.equal(1);
    expectHttpResponseToBeHcWorker(testUser, parsedHttpResponse.worker_added); // testing the result
    
  });

  // GET - Invalid path
  it("should return Not Found", async () => {
    const res = await chai.request(app).get("/INVALID_PATH");
    expect(res).to.have.status(404);
  });

  

  // POST - Bad Request
  it("should return Bad Request", async () => {
    const res = await chai.request(app).post("/hcworkers").type("form").send({
      color: "YELLOW",
    });
    expect(res).to.have.status(400);
  });
});

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

