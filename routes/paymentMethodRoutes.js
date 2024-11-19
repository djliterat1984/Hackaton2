const express = require( 'express' );
const {
	getAllPaymentMethods,
	getPaymentMethodById,
	newPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
	listAllPaymentMethods,
	listPaymentMethodById,
} = require( '../controllers/paymentMethodController.js' );


const paymentMethodRouter = express.Router();

paymentMethodRouter.get( '/', getAllPaymentMethods );

paymentMethodRouter.get ('/details', listAllPaymentMethods);

paymentMethodRouter.get('/details/:id', listPaymentMethodById);

paymentMethodRouter.get( '/:id', getPaymentMethodById );

paymentMethodRouter.post( '/', newPaymentMethod );

paymentMethodRouter.put( '/:id', updatePaymentMethod );

paymentMethodRouter.delete( '/:id', deletePaymentMethod );

module.exports = paymentMethodRouter