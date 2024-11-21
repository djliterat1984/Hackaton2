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