module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("courses", {
    coursename: {
      type: Sequelize.STRING,
    },
    teacherId: {
      type: Sequelize.STRING,
    },
  });

  return Course;
};
