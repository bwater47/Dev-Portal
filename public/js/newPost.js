// Create a new post by submitting the form
const newPost = async (event) => {
  // Line 4: The event.preventDefault() method stops the browser from performing the default action the event wants to do
  event.preventDefault();
  // Line 6-7: The title and content values are retrieved from the form and trimmed
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  // Line 9-15: If the title and content exist, a POST request is made to the /api/posts route with the title and content in the body of the request
  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    // Line 16-22: If the response is ok, the user is redirected to the dashboard, otherwise an alert is shown
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};
// Line 25-26: The event listener is added to the form to listen for a submit event and call the newPost function
document.querySelector('.new-post-form').addEventListener('submit', newPost);
