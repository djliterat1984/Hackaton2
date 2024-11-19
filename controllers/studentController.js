const {
	getAllStudentsDB,
	getStudentByIdDB,
	insertStudentDB,
	updateStudentDB,
	deleteStudentDB
} = require( '../models/studentData.js' )

const getAllStudents = async( req, res ) => {
	try {
		const data = await getAllStudentsDB()
		res.json( data );	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const listAllStudents = async( req, res ) => {
	try {
		const students = await getAllStudentsDB();
		res.render('partials/student-list', { students });
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const getStudentById = async( req, res ) => {
	try {
		const { id } = req.params;
		const data = await getStudentByIdDB( id );
		if ( !data )
			return res.status( 404 ).json( 'OOPS....Check the fields and try again.' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const listStudentById = async( req, res ) => {
	try {
		const { id } = req.params;
		const students = await getStudentByIdDB( id );
		if ( !students )
			return res.status( 404 ).json( 'OOPS....Check the fields and try again.' )
		res.render('partials/student-list', { students });
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const newStudent = async ( req, res ) => {
	try {
		const { name, debt } = req.body;
		const data = await insertStudentDB( name, debt );	
		if ( !data )
			return res.status( 404 ).json( 'OOPS....Check the fields and try again.' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const updateStudent = async ( req, res ) => {
	try {
		const { id } = req.params;
		const { name, debt } = req.body;
		const data = await updateStudentDB( id, name, debt );
		
		if ( !data )
			return res.status( 404 ).json( 'OOPS....Check the fields and try again.' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const deleteStudent = async ( req, res ) => {
	try {
		const { id } = req.params;
		const data = await deleteStudentDB( id );	
		if ( !data )
			return res.status( 404 ).json( 'Not found' )
		
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

module.exports = {
	getAllStudents,
	getStudentById,
	newStudent,
	updateStudent,
	deleteStudent,
	listAllStudents,
	listStudentById,
}