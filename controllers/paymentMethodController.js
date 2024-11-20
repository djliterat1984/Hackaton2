const {
	getAllPaymentMethodsDB,
	getPaymentMethodByIdDB,
	insertPaymentMethodDB,
	updatePaymentMethodDB,
	deletePaymentMethodDB
} = require( '../models/paymentMethodData.js' )

const getAllPaymentMethods = async( req, res ) => {
	try {
		const data = await getAllPaymentMethodsDB()
		res.json( data );	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const listAllPaymentMethods = async( req, res ) => {
	try {
		const methods = await getAllPaymentMethodsDB()
		res.render('partials/methods-list', { methods});		
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const getPaymentMethodById = async( req, res ) => {
	try {
		const { id } = req.params;
		const data = await getPaymentMethodByIdDB( id );
		if ( !data )
			return res.status( 404 ).json( 'Not found' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const listPaymentMethodById = async( req, res ) => {
	try {
		const { id } = req.params;
		const methods = await getPaymentMethodByIdDB( id );
		if ( !methods )
			return res.status( 404 ).json( 'Not found' )
		
		res.render('partials/methods-list', { methods});	
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const newPaymentMethod = async ( req, res ) => {
	try {
		const { name, active } = req.body;
		const data = await insertPaymentMethodDB( name, active );	
		if ( !data )
			return res.status( 404 ).json( 'OOPS....Check the fields and try again.' )
		
		console.log( data );
		res.status(201).json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const updatePaymentMethod = async ( req, res ) => {
	try {
		const { id } = req.params;
		const { name, active } = req.body;
		console.log( name );
		if ( name == '' ) {
			const method = getPaymentMethodByIdDB( id );
			name = method.name;
		}
		
		const data = await updatePaymentMethodDB( id, name, active );
		
		if ( !data )
			return res.status( 404 ).json( 'OOPS....Check the fields and try again.' )
		
		console.log( data );
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

const deletePaymentMethod = async ( req, res ) => {
	try {
		const { id } = req.params;
		const data = await deletePaymentMethodDB( id );	
		if ( !data )
			return res.status( 404 ).json( 'OOPS....Check the fields and try again.' )
		
		res.json(data)
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'something went wrong'})
	}
}

module.exports = {
	getAllPaymentMethods,
	getPaymentMethodById,
	newPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
	listAllPaymentMethods,
	listPaymentMethodById,
}