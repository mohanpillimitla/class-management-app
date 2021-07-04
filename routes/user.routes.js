const { authJwt } = require("../middleware");

const classroomController = require("../controllers/classroom.controller");

const studentController = require("../controllers/student.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/classroom",
    [authJwt.verifyToken, authJwt.isTeacher],
    classroomController.list
  );
  app.get(
    "/api/classroom/:id",
    [authJwt.verifyToken],
    classroomController.getById
  );
  app.post(
    "/api/classroom",
    [authJwt.verifyToken, authJwt.isTeacher],
    classroomController.add
  );
  app.put(
    "/api/classroom/:id",
    [authJwt.verifyToken, authJwt.isTeacher],
    classroomController.update
  );
  app.delete(
    "/api/classroom/:id",
    [authJwt.verifyToken, authJwt.isTeacher],
    classroomController.delete
  );

  app.get(
    "/api/student",
    [authJwt.verifyToken, authJwt.isTeacher],
    studentController.list
  );
  app.get("/api/student/:id", [authJwt.verifyToken], studentController.getById);
  app.post(
    "/api/student",
    [authJwt.verifyToken, authJwt.isTeacher],
    studentController.add
  );
  app.put(
    "/api/student/:id",
    [authJwt.verifyToken, authJwt.isTeacher],
    studentController.update
  );
  app.delete(
    "/api/student/:id",
    [authJwt.verifyToken, authJwt.isTeacher],
    studentController.delete
  );
};
