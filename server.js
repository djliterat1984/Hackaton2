const express = require( 'express' );
const paymentRouter = require( './routes/paymentsRoutes' );
const studentRouter = require( './routes/studentRoutes' );
const paymentMethodRouter = require( './routes/paymentMethodRoutes.js' );
const path = require("path");
const { checkLogin } = require('./models/usersData.js');
const { generateToken } = require('./middlewares/authMiddlewares.js');
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

app.get('/login/form', (req, res) => {
	res.render('partials/loginform')
})

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const loginMessage = await checkLogin(username, password);
		if (loginMessage.message === 'Login successful'){
		// If credentials are valid, generate and return JWT token
		const token = generateToken(loginMessage.user.id, loginMessage.user.role);
		res.json({ token });
		} else {
			res.json(loginMessage)
		}		
	} catch (error) {
		console.log(error);
		if (error.message === 'Incorrect password') {
			return res.status(401).json({
			  message: 'Incorrect password',
			});
		  } else {
		res.sendStatus(500);
		  }
	}

  });

  app.use((err, req, res, next) => {
	console.error(err);  // Log the error (you can add more sophisticated logging if needed)
  
	// Send a generic response to the client (you can make it more specific depending on error type)
	res.status(err.status || 500).json({
	  message: err.message || 'An unexpected error occurred',
	});
  });