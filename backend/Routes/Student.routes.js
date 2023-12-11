const express = require("express");
const router = express.Router();
const StudentService = require("../Controller/Student.Controller");


router
  .route("/student")
  .post( StudentService.CreateStudent)
  .get(StudentService.GetAllStudents);

router
  .route("/student/:id")
  .get(StudentService.GetStudentByID)
  .patch(StudentService.UpdateStudentById)
  .delete(StudentService.RemoveStudent);


  module.exports = router;