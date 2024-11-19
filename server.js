const express = require( 'express' );
const paymentRouter = require( './routes/paymentsRoutes' );
const studentRouter = require( './routes/studentRoutes' );
const paymentMethodRouter = require( './routes/paymentMethodRoutes.js' );
const path = require("path");
const app = express();

// Set up view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use( express.json() );

const PORT = 3001;
app.listen( PORT, () => {
	console.log(`run on ${PORT}`);
} )
app.use(express.static('public'));
app.use( '/payments', paymentRouter )
app.use( '/students', studentRouter );
app.use( '/methods', paymentMethodRouter );

