// Variable for the function to handle the signup form.
const signupFormHandler = async (event) => {
  // Prevent the default action of the form.
  event.preventDefault();
  // Get the values from the form.
  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  // If both values are present, send a POST request to the API endpoint.
  if (email && username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the response is ok, redirect to the dashboard page.
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  }
};
// Listens for the submit event on the signup form and calls the signupFormHandler function by selecting the element by its id.
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
