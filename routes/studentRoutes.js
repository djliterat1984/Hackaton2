const express = require( 'express' );
const {
	getAllStudents,
	getStudentById,
	newStudent,
	updateStudent,
	deleteStudent,
	listAllStudents,
	listStudentById
} = require( '../controllers/studentController.js' );
const { getAllStudentsDB } = require('../models/studentData.js');


const studentRouter = express.Router();

studentRouter.get( '/', getAllStudents );

studentRouter.get("/studentslist", listAllStudents)

studentRouter.get("/studentslist/:id", listStudentById);

studentRouter.get( '/:id', getStudentById );

studentRouter.post( '/', newStudent );

studentRouter.put( '/:id', updateStudent );

studentRouter.delete( '/:id', deleteStudent );

module.exports = studentRouter