const db = require("../models");
const Student = db.student;
const Classroom = db.classroom;

module.exports = {
  list(req, res) {
    return Classroom.findAll({
      include: [
        {
          model: Student,
          as: "students",
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: Student, as: "students" }, "createdAt", "DESC"],
      ],
    })
      .then((classrooms) => res.status(200).send(classrooms))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Classroom.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: "students",
        },
      ],
    })
      .then((classroom) => {
        if (!classroom) {
          return res.status(404).send({
            message: "Classroom Not Found",
          });
        }
        return res.status(200).send(classroom);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return Classroom.create({
      classname: req.body.classname,
    })
      .then((classroom) => res.status(201).send(classroom))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Classroom.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: "students",
        },
      ],
    })
      .then((classroom) => {
        if (!classroom) {
          return res.status(404).send({
            message: "Classroom Not Found",
          });
        }
        return classroom
          .update({
            classname: req.body.classname || classroom.classname,
          })
          .then(() => res.status(200).send(classroom))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Classroom.findByPk(req.params.id)
      .then((classroom) => {
        if (!classroom) {
          return res.status(400).send({
            message: "Classroom Not Found",
          });
        }
        return classroom
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
