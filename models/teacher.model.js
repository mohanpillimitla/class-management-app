module.exports = (sequelize, Sequelize) => {
  const Teacher = sequelize.define("teachers", {
    teachername: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    courseId: {
      type: Sequelize.INTEGER,
    },
  });

  return Teacher;
};
