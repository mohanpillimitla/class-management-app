const { teacher } = require("../models");
const db = require("../models");
const Student = db.student;
const Classroom = db.classroom;
const Course = db.course;
const Teacher = db.teacher;

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

  addWithCourseTeacher(req, res) {
    return Teacher.create(
      {
        teachername: req.body.teachername,
        userId:req.body.userId,
        course: req.body.course,
      },
      {
        include: [
          {
            model: Course,
            as: "course",
          },
        ],
      }
    )
      .then((teacher) => res.status(201).send(teacher))
      .catch((error) => res.status(400).send(error));
  },

  addCourse(req, res) {
    return Student.findByPk(req.body.studentId, {
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
        Course.findByPk(req.body.courseId).then((course) => {
          if (!course) {
            return res.status(404).send({
              message: "Course Not Found",
            });
          }
          student.addCourse(course);
          return res.status(200).send(student);
        });
      })
      .catch((error) => res.status(400).send(error));
  },
};
