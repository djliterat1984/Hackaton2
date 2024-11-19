const {
	getAllPaymentsDetailsDB,
	insertPaymentDB,
	updatePaymentAmountDB,
	deletePaymentDB,
	getDetailsByMethodDB,
	getDetailsByStudentDB,
	// getPaymentDetailsByIdDB,
	// getPaymentsDetailsByMethodDB,
	// getPaymentsByStudentDB,
	// getPaymentsByMethodDB
} = require( '../models/paymentsData.js' )

const getAllPayments = async( req, res ) => {
	try {
		const data = await getAllPaymentsDetailsDB();
		res.json( data );	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const listAllPayments = async( req, res ) => {
	try {
		const details = await getAllPaymentsDetailsDB();
		res.render('partials/details-list', { details });	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}


const getDetailsByMethod = async( req, res ) => {
	try {
		const { methodId } = req.params;
		console.log('methodid', methodId);
		
		const data = await getDetailsByMethodDB( methodId );
		if ( !data )
			return res.status( 404 ).json( 'Method not found' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const getDetailsByStudent = async( req, res ) => {
	try {
		const { studentId } = req.params;
		const data = await getDetailsByStudentDB( studentId );
		if ( !data )
			return res.status( 404 ).json( 'Student Not found' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const listDetailsByMethod = async( req, res ) => {
	try {
		const { methodId } = req.params;
		console.log('methodid', methodId);
		
		const details = await getDetailsByMethodDB( methodId );
		if ( !details )
			return res.status( 404 ).json( 'Method not found' )
		
		console.log( details );
		res.render('partials/details-list', { details });	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const listDetailsByStudent = async( req, res ) => {
	try {
		const { studentId } = req.params;
		const details = await getDetailsByStudentDB( studentId );
		if ( !details )
			return res.status( 404 ).json( 'Student Not found' )
		
		console.log( details );
		res.render('partials/details-list', { details });	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const newPayment = async ( req, res ) => {
	try {
		const { studentId, paymentMethodId, amount } = req.body;
		const data = await insertPaymentDB( studentId, paymentMethodId, amount );	
		if ( !data )
			return res.status( 400 ).json( 'OOPS....Check the fields and try again.' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const updatePayment = async ( req, res ) => {
	try {
		const { id } = req.params;
		const { newAmount } = req.body;
		const data = await updatePaymentAmountDB( id, newAmount );
		
		if ( !data )
			return res.status( 400 ).json( 'OOPS....Check the fields and try again.' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const deletePayment = async ( req, res ) => {
	try {
		const { id } = req.params;
		const data = await deletePaymentDB( id );	
		if ( !data )
			return res.status( 404 ).json( 'OOPS....Check the fields and try again.'  )
		
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

module.exports = {
	getAllPayments,
	getDetailsByMethod,
	getDetailsByStudent,
	newPayment,
	updatePayment,
	deletePayment,
	listAllPayments,
	listDetailsByMethod,
	listDetailsByStudent,
}