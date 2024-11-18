const express = require( 'express' );
const {
	getAllPayments,
	getAllByType,
	getAllByStudent,
	newPayment,
	updatePayment,
	deletePayment
} = require( '../controllers/paymentsController.js' );


const paymentRouter = express.Router();

paymentRouter.get( '/', getAllPayments );

paymentRouter.get( '/method/:method_id', getAllByType );

paymentRouter.get( '/student/:student_id', getAllByStudent );

paymentRouter.post( '/', newPayment );

paymentRouter.put( '/:id', updatePayment );

paymentRouter.delete( '/:id', deletePayment );

module.exports = paymentRouter

// Get all payments
// Get all payments by type
// get all payments by student
// Record payment - update debt
// update payment - update debt
// delete payment - update debt