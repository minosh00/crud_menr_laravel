const mongoose = require('mongoose');
const Student = require("../Models/Student");
const { validateStudent } = require('../validation/validateStudent');



const CreateStudent =  async (req, res ) => {
  
  validateStudent(req, res, async () => {
    const { name, email, school } = req.body;
    const newStudent = new Student({ name, email, school });

    try {
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
};
  

  const GetAllStudents = async (req, res) => { 
    try {
        const students = await Student.find();
                 
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const UpdateStudentById = async (req, res) => {
  const { id } = req.params;
  const { name, email, school } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `Invalid ID: ${id}` });
    }

    validateStudent(req, res, async () => {
      const updatedStudent = await Student.findByIdAndUpdate(id, { name, email, school }, { new: true });

      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json(updatedStudent);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


  const GetStudentByID = async (req, res) => {
    const { id } = req.params;
    try {
        const students = await Student.findById(id);
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const RemoveStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id)
        res.json({ msg: "Remove Student Compelete" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports ={CreateStudent, GetAllStudents,UpdateStudentById,GetStudentByID,RemoveStudent};