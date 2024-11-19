const express = require( 'express' );
const {
	getAllPayments,
	getDetailsByMethod,
	getDetailsByStudent,
	newPayment,
	updatePayment,
	deletePayment,
	listAllPayments,
	listDetailsByStudent,
	listDetailsByMethod
} = require( '../controllers/paymentsController.js' );


const paymentRouter = express.Router();

paymentRouter.get( '/', getAllPayments );

paymentRouter.get( '/details', listAllPayments );

paymentRouter.get( '/details/student/:studentId', listDetailsByStudent);

paymentRouter.get( '/details/method/:methodId', listDetailsByMethod);

paymentRouter.get( '/method/:methodId', getDetailsByMethod );

paymentRouter.get( '/student/:studentId', getDetailsByStudent );

paymentRouter.post( '/', newPayment );

paymentRouter.put( '/:id', updatePayment );

paymentRouter.delete( '/:id', deletePayment );

module.exports = paymentRouter
