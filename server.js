const express = require( 'express' );
const paymentRouter = require( './routes/paymentsRoutes' );

const app = express();

app.use( express.json() );

const PORT = 3001;
app.listen( PORT, () => {
	console.log(`run on ${PORT}`);
} )

app.use('/payments', paymentRouter)

