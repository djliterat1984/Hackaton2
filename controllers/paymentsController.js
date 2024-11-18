const {getAllPaymentsDb, getAllByTypeDb, createNewBookDb } = require('../models/booksData.js')

const getAllPayments = async( req, res ) => {
	try {
		const data = await getAllPaymentsDb();
		res.json( data );	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const getAllByType = async( req, res ) => {
	try {
		const { id } = req.params;
		const data = await getAllByTypeDb( id );
		if ( !data )
			return res.status( 404 ).json( 'Post not found' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const getAllByStudent = async( req, res ) => {
	try {
		const { id } = req.params;
		const data = await getAllByStudentDb( id );
		if ( !data )
			return res.status( 404 ).json( 'Post not found' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

module.exports = {
	getAllPayments,
}