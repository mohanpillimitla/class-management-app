const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const Course = db.course;

module.exports = {
  list(req, res) {
    return Course.findAll({
      include: [
        {
          model: Student,
          as: "students",
        },
        {
          model: Teacher,
          as: "teacher",
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: Student, as: "students" }, "createdAt", "DESC"],
      ],
    })
      .then((courses) => res.status(200).send(courses))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Course.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: "student",
        },
      ],
    })
      .then((course) => {
        if (!course) {
          return res.status(404).send({
            message: "Course Not Found",
          });
        }
        return res.status(200).send(course);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Course.create({
      coursename: req.body.coursename,
      teacherId: req.body.teacherId,
    })
      .then((course) => res.status(201).send(course))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Course.findByPk(req.params.id, {
      include: [
        {
          model: Course,
          as: "course",
        },
      ],
    })
      .then((course) => {
        if (!course) {
          return res.status(404).send({
            message: "Course Not Found",
          });
        }
        return course
          .update({
            coursename: req.body.coursename || classroom.coursename,
            teacherId: req.body.teacherId,
          })
          .then(() => res.status(200).send(course))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Course.findByPk(req.params.id)
      .then((course) => {
        if (!course) {
          return res.status(400).send({
            message: "Course Not Found",
          });
        }
        return course
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
