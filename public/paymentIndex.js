// // Function to show the loading overlay
// function showLoadingOverlay() {
// 	document.getElementById('loading-overlay').style.display = 'flex';
// }

// // Function to hide the loading overlay
// function hideLoadingOverlay() {
//   document.getElementById('loading-overlay').style.display = 'none';
// }
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
  const studentId = prompt( "Enter the student ID: " );
  const paymentMethodId = prompt( "Enter the Payment Method ID: " );
  const amount = prompt("Enter the amount: ")
  if ( !studentId || !paymentMethodId || !amount)
    return alert( 'Those fields must be completed' )
  
  const content = {studentId, paymentMethodId, amount}
  
  let responseStatus = '';
  showLoadingOverlay();
  fetch( 'payments', {
    method: 'POST',
    body: JSON.stringify( content ),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then( response => {
      responseStatus = response.status;
      response.text()
    } )
    .then( html => {
	    // Insert the HTML content into the content div
	    document.getElementById('dynamic-content').innerHTML = responseStatus == 201? "Created!!!" : html;
	  })
    .catch(error => {
      console.error('Error loading content:', error);
    }).finally(()=> {hideLoadingOverlay();});
} )

document.getElementById( 'updatePaymentBtn' ).addEventListener( 'click', () => {
  const token = localStorage.getItem('authToken');
  const id = prompt( "Enter the payment ID: " )
  if ( !id ) {
    return "The ID field must be completed"
  }
  const student_id = prompt( "Enter the student ID: " );
  const method_id = prompt( "Enter the Payment Method ID: " );
  const newAmount = prompt( "Enter the amount: " )
  const content = {student_id, method_id, newAmount}
  let responseStatus = '';
  showLoadingOverlay();
  fetch( `/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify( content ),
    headers: {
      "Content-type": "application/json",
      'Authorization': token ? `Bearer ${token}` : '',
    }
  })
    .then( response => {
      responseStatus = response.status;
      response.text()
    } )
    .then( html => {
	    // Insert the HTML content into the content div
	    document.getElementById('dynamic-content').innerHTML = responseStatus == 200? "Updated!!!" : html;
	  })
    .catch(error => {
      console.error('Error loading content:', error);
    }).finally(()=> {hideLoadingOverlay();});
} )

document.getElementById('deletePaymentBtn').addEventListener('click', function() {
  // Step 1: Prompt for payment ID
  const paymentId = prompt("Enter the payment ID to delete:");
  
  if (!paymentId) {
    alert("No payment ID provided.");
    return;
  }

  // Step 2: Fetch payment details using GET request
  fetch(`payments/${paymentId}`)
    .then( response => {
      console.log( response );
      return response.json();
    } )
  .then(paymentDetails => {
    const token = localStorage.getItem('authToken');
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
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
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
