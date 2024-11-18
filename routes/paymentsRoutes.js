const express = require( 'express' );
// const {
// 	getAllBooks,
// 	getBookById,
// 	createNewBook,
// } = require( '../controllers/bookController.js' );


const paymentRouter = express.Router();

paymentRouter.get( '/', getAllPayments );

paymentRouter.get( '/:id', getAllByType );

paymentRouter.get( '/:id', getAllByStudent );

paymentRouter.post( '/', addNewPayment );

paymentRouter.post( '/:id', updatePayment );

paymentRouter.post( '/:id', deletePayment );

module.exports = paymentRouter

// Get all payments
// Get all payments by type
// get all payments by student
// Record payment - update debt
// update payment - update debt
// delete payment - update debt