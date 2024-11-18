const { paymentsDb } = require( '../config/paymentsDb.js' );

const getAllPaymentsDb = () => {
	return paymentsDb( 'payments' ).select( 'id', 'title', 'author', 'publishedyear');
}

const getAllByTypeDb = (id) => {
	return paymentsDb( 'payments' ).select('id', 'title', 'author', 'publishedyear').where({id});
}

const getAllByStudentDb = (id) => {
	return paymentsDb( 'payments' ).select('id', 'title', 'author', 'publishedyear').where({id});
}

const createNewBookDb = (title, author, publishedYear) => {
	return paymentsDb( 'payments' ).insert( { title, author, publishedyear:publishedYear } ).returning('id')
}

module.exports = {
	getAllPaymentsDb,
	getBookByIdDb,
	createNewBookDb,
}