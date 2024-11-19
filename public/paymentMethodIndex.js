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

document.getElementById( 'payMethodsBtn' ).addEventListener( 'click', () => {
	loadContent(`/methods/details`)
} )

document.getElementById( 'payMethodByIdBtn' ).addEventListener( 'click', () => {
	const id = prompt("Enter a payment method ID: ");
	loadContent(`/methods/details/${id}`)
} )

document.getElementById( 'addPayMethodsBtn' ).addEventListener( 'click', () => {
	const name = prompt( "Enter the payment method name: " );
  if ( !name )
    return alert( 'This field must be completed' )
  const content = {name}
	let responseStatus = '';
  showLoadingOverlay();
  fetch( 'methods', {
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

document.getElementById( 'updatePayMethodsBtn' ).addEventListener( 'click', () => {
	const id = prompt( "Enter the payment method ID: " )
  if ( id == null )
    return;
  
  if ( id == '' || id == undefined)
    return alert( 'This field must be completed' )
  
  const name = prompt( "Enter the payment method name: " );
  const content = {name}
	let responseStatus = '';
  showLoadingOverlay();
  fetch( `methods/${id}`, {
    method: 'PUT',
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
	    document.getElementById('dynamic-content').innerHTML = responseStatus == 200? "Updated!!!" : html;
	  })
    .catch(error => {
      console.error('Error loading content:', error);
    }).finally(()=> {hideLoadingOverlay();});
} )

document.getElementById( 'deletePayMethodsBtn' ).addEventListener( 'click', () => {
  // Step 1: Prompt for payment ID
  const paymentMethodId = prompt("Enter the payment method ID to delete:");
  
  if (!paymentMethodId) {
    alert("No payment method ID provided.");
    return;
  }

  // Step 2: Fetch payment details using GET request
  fetch(`methods/${paymentMethodId}`)
    .then( response => {
      console.log( response );
      return response.json();
    } )
    .then(methodsDetails => {
    // Step 3: Show a confirmation box with payment details
	  console.log(methodsDetails);
    const confirmMessage = `Are you sure you want to delete this Payment Method?\nPayment Method: ${methodsDetails[0].name}`;
    const isConfirmed = confirm(confirmMessage);
    
    if (isConfirmed) {
      // Step 4: If confirmed, send a DELETE request with the payment ID
			fetch( `methods/${ paymentMethodId }`, {
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
				console.error(`Error deleting payment method:`, error);
				alert(`There was an error deleting the payment method.`);
			});	
    } else {
    // If not confirmed
    alert('Payment method deletion canceled.');
  }
    })
    .catch(error => {
      console.error('Error fetching payment method details:', error);
      alert('Error fetching payment method details.');
    });
} )