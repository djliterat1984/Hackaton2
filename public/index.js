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
  loadContent('students/studentslist');
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
	loadContent(`/methods/details`)
} )


document.getElementById( 'payMethodByIdBtn' ).addEventListener( 'click', () => {
	const id = prompt("Enter a method Id: ");
	loadContent(`/methods/details/${id}`)
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

// document.getElementById( 'deletePaymentBtn' ).addEventListener( 'click', () => {
// 	const id = prompt("Enter payment Id to delete: ");
// 	const payment_page = await fetch("/payments", {})

// } )
document.getElementById('deletePaymentBtn').addEventListener('click', function() {
  // Step 1: Prompt for payment ID
  const paymentId = prompt("Enter the payment ID to delete:");
  
  if (!paymentId) {
    alert("No payment ID provided.");
    return;
  }

  // Step 2: Fetch payment details using GET request
  fetch(`payments/${paymentId}`)
  .then(response => {console.log(response); return response.json();})
  .then(paymentDetails => {
    // Step 3: Show a confirmation box with payment details
	console.log(paymentDetails);
    const confirmMessage = `
      Are you sure you want to delete this payment?
      Payment ID: ${paymentDetails[0].payment_id}
      Amount: ${paymentDetails[0].amount}
    `;
    const isConfirmed = confirm(confirmMessage);
    
    if (isConfirmed) {
      // Step 4: If confirmed, send a DELETE request with the payment ID
      fetch(`payments/${paymentId}`, {
        method: 'DELETE', // POST method to delete payment
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json()) // Parse the JSON response
      .then(result => {
        // Step 5: Alert the user about the deletion success
        alert(`Successfully deleted: ${JSON.stringify(result)}`);
      })
      .catch(error => {
        console.error('Error deleting payment:', error);
        alert('There was an error deleting the payment.');
      });
    } else {
      // If not confirmed
      alert('Payment deletion canceled.');
    }
  })
  .catch(error => {
    console.error('Error fetching payment details:', error);
    alert('Error fetching payment details.');
  });
});
