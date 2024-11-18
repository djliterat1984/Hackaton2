const {
	getAllPaymentsDetailsDB,
	getAllPaymentsDB,
	getPaymentByStudentDB,
	insertPaymentDB,
	updatePaymentAmountDB,
	deletePaymentDB
} = require( '../models/paymentsData.js' )

const getAllPayments = async( req, res ) => {
	try {
		const data = await getAllPaymentsDB();
		res.json( data );	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const getAllByType = async( req, res ) => {
	try {
		const { id } = req.params;
		const data = await getAllPaymentsDetailsDB( id );
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
		const { studentId } = req.params;
		const data = await getPaymentDetailsByIdDB( studentId );
		if ( !data )
			return res.status( 404 ).json( 'Post not found' )
		
		console.log( data );
		res.json(data)
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
			return res.status( 404 ).json( 'Post not found' )
		
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
			return res.status( 404 ).json( 'Post not found' )
		
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
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

module.exports = {
	getAllPayments,
	getAllByType,
	getAllByStudent,
	newPayment,
	updatePayment,
	deletePayment,
}