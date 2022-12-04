const db = require("../db/dbConfig.js");


const getAllRequests = async () => {
  try {
    console.log("Listing all posted requests");
    const requests = await db.any(
      "SELECT * FROM requests ORDER BY req_date ASC"
    ); // Lists requests by their date, ascending
    return requests;
  } catch (error) {
    return error;
  }
};

// --Routes--

const makeRequest = async (request) => {
  try {
    console.log("Adding request to database");
    request = await db.one(
      "INSERT INTO requests (elder_id, description, req_date, location, time, title, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        request.elder_id,
        request.description,
        request.req_date,
        request.location,
        request.time,
        request.title,
        request.image,
      ]
    );
    return request;
  } catch (error) {
    return error;
  }
};

const getRequest = async (id) => {
  try {
    console.log("Retreiving request from request table");
    const request = await db.one("SELECT * FROM requests WHERE id=$1", id);
    return request;
  } catch (error) {
    return error;
  }
};


const volunteerRequests = async (uuid) => {
  try {
    console.log(`Retreiving assigned requests for user ${uuid}`);
    const requests = await db.any(
      "SELECT * FROM requests WHERE volunteer_id=$1 ORDER BY req_date ASC",
      uuid
    );
    return requests;
  } catch (error) {
    return error;
  }
};

const seniorRequests = async (uuid) => {
  try {
    console.log(`Retreiving posted requests by user ` + uuid);
    const requests = await db.any(
      "SELECT * FROM requests WHERE elder_id=$1",
      uuid
    );
    return requests;
  } catch (error) {
    return error;
  }
};

const editRequest = async (request, id) => {
  try {
    console.log("Editing request with id of " + id);
    const req = await db.one(
      "UPDATE requests SET elder_id=$1, volunteer_id=$2, req_date=$3, description=$4, location=$5, time=$6, assigned=$7 WHERE id=$8 RETURNING *",
      [
        request.elder_id,
        request.volunteer_id,
        request.req_date,
        request.description,
        request.location,
        request.time,
        request.assigned,
        id,
      ]
    );
    return req;
  } catch (error) {
    return error;
  }
};

const assignVolunteer = async (request, volunteer) => {
  try {
    console.log(`Assigning volunteer ${volunteer.id} to request ${request.id}`);
    const assign = await db.one(
      "UPDATE requests SET volunteer=$1, assigned=$2 WHERE id=$3 RETURNING *",
      [volunteer.id, "TRUE", request.id]
    );
    return assign;
  } catch (error) {
    return error;
  }
};

const removeVolunteer = async (id) => {
  try {
    console.log("Removing volunteer from request");
    const unAssign = await db.one(
      "UPDATE requests SET volunteer=$1, assigned=$2 WHERE id=$3 RETURNING *",
      [NULL, "FALSE", id]
    );
    return unAssign;
  } catch (error) {
    return error;
  }
};

const deleteRequest = async (id) => {
  try {
    console.log("Deleting request with id of " + id);
    const request = await db.one(
      "DELETE FROM requests WHERE id=$1 RETURNING *",
      id
    );
    return request;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRequests,
  getRequest,
  editRequest,
  makeRequest,
  deleteRequest,
  volunteerRequests,
  seniorRequests,
  assignVolunteer,
  removeVolunteer,
};
