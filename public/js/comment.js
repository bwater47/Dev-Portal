// The newCommentHandler function is similar to the newPost and editPost functions, but it creates a new comment instead of a new post. The deleteCommentHandler function is similar to the deletePostHandler function, but it deletes a comment instead of a post.
const newCommentHandler = async (event) => {
    // Stop the browser from submitting the form by default so we can do so with JavaScript
  event.preventDefault();
// Get the comment content from the form
  const comment = document.querySelector('#comment-content').value.trim();
  // Get the post id from the URL
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
// If the comment field isn't empty, send the comment data to the comment route
  if (comment) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });
// If the response is okay, reload the page, otherwise show an alert
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};
// Add an event listener to the form to listen for a submit event and call the newCommentHandler function
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
// This function is used to delete a comment
const deleteCommentHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
// Send a DELETE request to the comment route with the id of the comment to be deleted
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  }
};
// Add an event listener to the comment list to listen for a click event and call the deleteCommentHandler function
document
  .querySelector('.comment-list')
  .addEventListener('click', deleteCommentHandler);
