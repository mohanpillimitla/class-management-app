const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.teacher = require("./teacher.model.js")(sequelize, Sequelize);
db.classroom = require("./classroom.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.classroom.hasMany(db.student, {
  foreignKey: "classroomId",
  as: "students",
});

db.student.belongsTo(db.classroom, {
  foreignKey: "classroomId",
  as: "classroom",
});

db.course.belongsToMany(db.student, {
  through: "student_courses",
  foreignKey: "courseId",
  otherKey: "studentId",
});

db.student.belongsToMany(db.course, {
  through: "student_courses",
  foreignKey: "studentId",
  otherKey: "courseId",
});

db.student.hasOne(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.teacher.hasOne(db.user, {
  foreignKey: "userId",
  as: "user",
});


db.course.hasOne(db.teacher, {
  foreignKey: "teacherId",
  as: "teacher",
});

db.ROLES = ["student", "teacher", "admin"];

module.exports = db;
