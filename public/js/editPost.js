const editPost = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  // The id of the post is retrieved from the URL
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // If the title and content exist, a PUT request is made to the /api/posts/:id route with the title and content in the body of the request
  if (title && content) {
    const response = await fetch(`/api/posts/editposts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the response is ok, the user is redirected to the dashboard, otherwise an alert is shown
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit post');
    }
  }
};
// The event listener is added to the form to listen for a submit event and call the editPost function
document.querySelector('#edit-post-form').addEventListener('submit', editPost);

const deletePost = async (event) => {
  event.preventDefault();
  // The id of the post is retrieved from the URL
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // A DELETE request is made to the /api/posts/:id route
  const response = await fetch(`/api/posts/editposts/${id}`, {
    method: 'DELETE',
  });
  // If the response is ok, the user is redirected to the dashboard, otherwise an alert is shown
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete post');
  }
}
// The event listener is added to the delete button to listen for a click event and call the deletePost function
document.querySelector('#delete-post-btn').addEventListener('click', deletePost);
