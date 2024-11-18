const express = require( 'express' );
const paymentRouter = require( './routes/paymentsRoutes' );
const studentRouter = require( './routes/studentRoutes' );
const paymentMethodRouter = require( './routes/paymentMethodRoutes.js' );

const app = express();

app.use( express.json() );

const PORT = 3001;
app.listen( PORT, () => {
	console.log(`run on ${PORT}`);
} )

app.use( '/payments', paymentRouter )
app.use( '/students', studentRouter );
app.use( '/methods', paymentMethodRouter );

