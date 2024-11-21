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
	listDetailsByMethod,
	getPaymentById
} = require( '../controllers/paymentsController.js' );
const { verifyToken } = require('../middlewares/authMiddlewares.js');


const paymentRouter = express.Router();

paymentRouter.get( '/', getAllPayments );

paymentRouter.get( '/details', listAllPayments );

paymentRouter.get( '/details/student/:studentId', listDetailsByStudent);

paymentRouter.get( '/details/method/:methodId', listDetailsByMethod);

paymentRouter.get( '/method/:methodId', getDetailsByMethod );

paymentRouter.get( '/student/:studentId', getDetailsByStudent );

paymentRouter.get( '/:paymentId', getPaymentById)

paymentRouter.post( '/', newPayment );

paymentRouter.put( '/:id', verifyToken, updatePayment );

paymentRouter.delete( '/:id', verifyToken, deletePayment );

module.exports = paymentRouter
