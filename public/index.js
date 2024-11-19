// Function to show the loading overlay
function showLoadingOverlay() {
	document.getElementById('loading-overlay').style.display = 'flex';
}

// Function to hide the loading overlay
function hideLoadingOverlay() {
document.getElementById('loading-overlay').style.display = 'none';
}
// Fetch function to load content into the 'content' div
function loadContent(url) {
	showLoadingOverlay();
	fetch(url)
	.then(response => response.text())
	.then(html => {
	  // Insert the HTML content into the content div
	  document.getElementById('dynamic-content').innerHTML = html;
	})
	.catch(error => {
	  console.error('Error loading content:', error);
	}).finally(()=> {hideLoadingOverlay();});
}

// Event listener for the "All Students" button
document.getElementById('studentsBtn').addEventListener('click', function() {
  // Fetch the students list partial
  loadContent('/students/studentslist');
});
// document.getElementById( 'studentsBtn' ).addEventListener( 'click', async ( event ) => {
// 	try {
// 		event.preventDefault()
// 		console.log('hola');
		
// 		const response = await fetch( 'http://localhost:3001/students/');
// 		const result = await response.json()
// 		console.log(result);
// 	} catch (error) {
// 		console.log(error);
// 	}
// } )

document.getElementById( 'studentByIdBtn' ).addEventListener( 'click', () => {

} )

document.getElementById( 'addStudentsBtn' ).addEventListener( 'click', () => {

} )

document.getElementById( 'updateStudentsBtn' ).addEventListener( 'click', () => {

} )


document.getElementById( 'deleteStudentsBtn' ).addEventListener( 'click', () => {

} )

document.getElementById( 'payMethodsBtn' ).addEventListener( 'click', () => {

} )


document.getElementById( 'payMethodByIdBtn' ).addEventListener( 'click', () => {

} )

document.getElementById( 'addPayMethodsBtn' ).addEventListener( 'click', () => {

} )

document.getElementById( 'updatePayMethodsBtn' ).addEventListener( 'click', () => {

} )

document.getElementById( 'deletePayMethodsBtn' ).addEventListener( 'click', () => {

} )

document.getElementById( 'paymentsBtn' ).addEventListener( 'click', () => {
	loadContent('payments/details')
} )

document.getElementById( 'payByMethodBtn' ).addEventListener( 'click', () => {
	const id = prompt("Enter the method Id: ")
	loadContent(`payments/details/method/${id}`)
} )

document.getElementById( 'payByStudentBtn' ).addEventListener( 'click', () => {
	const id = prompt("Enter the student Id: ")
	loadContent(`payments/details/student/${id}`)
} )

document.getElementById( 'addPayment' ).addEventListener( 'click', () => {

} )

document.getElementById( 'updatePaymentBtn' ).addEventListener( 'click', () => {

} )

document.getElementById( 'deletePaymentBtn' ).addEventListener( 'click', () => {

} )