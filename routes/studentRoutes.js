const express = require( 'express' );
const {
	getAllStudents,
	getStudentById,
	newStudent,
	updateStudent,
	deleteStudent
} = require( '../controllers/studentController.js' );


const studentRouter = express.Router();

studentRouter.get( '/', getAllStudents );

studentRouter.get( '/:id', getStudentById );

studentRouter.post( '/', newStudent );

studentRouter.put( '/:id', updateStudent );

studentRouter.delete( '/:id', deleteStudent );

module.exports = studentRouter