module.exports = (sequelize, Sequelize) => {
  const ClassRoom = sequelize.define("classrooms", {
    classname: {
      type: Sequelize.STRING,
    },
  });

  return ClassRoom;
};
