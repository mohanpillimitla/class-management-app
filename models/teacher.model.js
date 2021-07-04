module.exports = (sequelize, Sequelize) => {
  const Teacher = sequelize.define("teachers", {
    lecturername: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });

  return Teacher;
};
