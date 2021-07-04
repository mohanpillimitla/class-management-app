module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("students", {
    studentname: {
      type: Sequelize.STRING,
    },
    classroomId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });

  return Student;
};
