const { teacher } = require("../models");
const db = require("../models");
const Student = db.student;
const Classroom = db.classroom;
const Course = db.course;

module.exports = {
  list(req, res) {
    return Student.findAll({
      include: [
        {
          model: Classroom,
          as: "classroom",
        },
        {
          model: Course,
          as: "courses",
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: Course, as: "courses" }, "createdAt", "DESC"],
      ],
    })
      .then((students) => res.status(200).send(students))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Student.findByPk(req.params.id, {
      include: [
        {
          model: Classroom,
          as: "classroom",
        },
        {
          model: Course,
          as: "courses",
        },
      ],
    })
      .then((student) => {
        if (!student) {
          return res.status(404).send({
            message: "Student Not Found",
          });
        }
        return res.status(200).send(student);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Student.create({
      classroomId: req.body.classroomId,
      studentname: req.body.studentname,
      userId: req.body.userId,
    })
      .then((student) => res.status(201).send(student))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Student.findByPk(req.params.id, {
      include: [
        {
          model: Classroom,
          as: "classroom",
        },
        {
          model: Course,
          as: "courses",
        },
      ],
    })
      .then((student) => {
        if (!student) {
          return res.status(404).send({
            message: "Student Not Found",
          });
        }
        return student
          .update({
            studentname: req.body.studentname || student.studentname,
          })
          .then(() => res.status(200).send(student))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Student.findByPk(req.params.id)
      .then((student) => {
        if (!student) {
          return res.status(400).send({
            message: "Student Not Found",
          });
        }
        return student
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
