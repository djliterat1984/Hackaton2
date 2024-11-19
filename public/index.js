document.getElementById( 'studentsBtn' ).addEventListener( 'click', async ( event ) => {
	try {
		event.preventDefault()
		console.log('hola');
		
		const response = await fetch( 'http://localhost:3001/students/');
		const result = await response.json()
		console.log(result);
	} catch (error) {
		console.log(error);
	}
} )

ument.getElementById( 'studentByIdBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'addStudentsBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'updateStudentsBtn' ).addEventListener( 'click', () => {

} )


ument.getElementById( 'deleteStudentsBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'payMethodsBtn' ).addEventListener( 'click', () => {

} )


ument.getElementById( 'payMethodByIdBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'addPayMethodsBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'updatePayMethodsBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'deletePayMethodsBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'paymentsBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'payByMethodBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'payByStudentBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'addPayment' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'updatePaymentBtn' ).addEventListener( 'click', () => {

} )

ument.getElementById( 'deletePaymentBtn' ).addEventListener( 'click', () => {

} )