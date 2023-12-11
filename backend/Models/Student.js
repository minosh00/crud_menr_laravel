
const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    school: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("StudentsList", studentSchema);
module.exports = Student;