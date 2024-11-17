const express = require( 'express' );
// const {
// 	getAllBooks,
// 	getBookById,
// 	createNewBook,
// } = require( '../controllers/bookController.js' );


const paymentRouter = express.Router();

paymentRouter.get( '/', getAllBooks );

paymentRouter.get( '/:id', getBookById );

paymentRouter.post( '/', createNewBook );

module.exports = paymentRouter

// Get all payments
// Get all payments by type
// get all payments by student
// Record payment - update debt
// update payment - update debt
// delete payment - update debt