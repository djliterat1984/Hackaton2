function loadContent ( url ) {
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

document.getElementById( 'studentsBtn' ).addEventListener( 'click', function () {
  // Fetch the students list partial
  loadContent('students/studentslist');
});

document.getElementById( 'studentByIdBtn' ).addEventListener( 'click', () => {
  const id = prompt("Enter a student Id: ");
	loadContent(`students/studentslist/${id}`)
} )

document.getElementById( 'addStudentsBtn' ).addEventListener( 'click', () => {
  const name = prompt( "Enter the name: " );
  if ( !name )
    return alert( 'This field must be completed' )
  const debt = Number( prompt( "Enter the fee: " ) )
  const content = {name, debt}
	let responseStatus = '';
	
  showLoadingOverlay();
  
	fetch( 'students', {
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

document.getElementById( 'updateStudentsBtn' ).addEventListener( 'click', () => {
  const id = prompt( "Enter the Student ID: " )
  if ( id == null )
    return;
  
  if ( id == '' || id == undefined)
    return alert( 'This field must be completed' )
  
  const name = prompt( "Enter the student name: " );
  const debt = Number(prompt("Enter the student's fee: "))
  const content = {name, debt}
	let responseStatus = '';
  showLoadingOverlay();
  fetch( `students/${ id }`, {
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

document.getElementById( 'deleteStudentsBtn' ).addEventListener( 'click', () => {
  // Step 1: Prompt for payment ID
  const studentId = prompt("Enter the student ID to delete:");
  
  if (!studentId) {
    alert("No student ID provided.");
    return;
  }

  // Step 2: Fetch payment details using GET request
  fetch(`students/${studentId}`)
    .then( response => {
      console.log( response );
      return response.json();
    } )
  	.then(studentDetails => {
    // Step 3: Show a confirmation box with payment details
			console.log(studentDetails);
			const confirmMessage = `Are you sure you want to delete this Student?\nStudent Name: ${studentDetails[0].name}\n
			`;
			const isConfirmed = confirm(confirmMessage);
    
    	if (isConfirmed) {
      // Step 4: If confirmed, send a DELETE request with the payment ID
				fetch(`students/${studentId}`, {
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
						console.error('Error deleting student:', error);
						alert('There was an error deleting the student.');
					});
			} else {
				// If not confirmed
				alert('Student deletion canceled.');
			}
  	})
		.catch(error => {
			console.error('Error fetching student details:', error);
			alert('Error fetching student details.');
		});
	} )

  document.addEventListener('DOMContentLoaded', function () {
    // Check if there's a JWT token in localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      // If token exists, hide the login form container
      document.getElementById('login-container').style.display = 'none';
    }

    // Handle form submission if the token doesn't exist
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevent form from submitting traditionally

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // If login is successful, store the token in localStorage
          localStorage.setItem('authToken', data.token);
          console.log("logged in");
      document.getElementById('login-container').style.display = 'none';
        } else {
          // Display error message if login failed
          document.getElementById('error-message').style.display = 'block';
          document.getElementById('error-message').textContent = data.message || 'Login failed';
        }
      } catch (error) {
        // Handle any unexpected errors
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'An unexpected error occurred';
      }
    });
  });