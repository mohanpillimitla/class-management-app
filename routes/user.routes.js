const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const classroomController = require("../controllers/classroom.controller");

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
};
