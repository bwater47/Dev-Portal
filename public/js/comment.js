// This function is used to handle the submission of a new comment
const newCommentHandler = async (event) => {
  event.preventDefault();
  const post_id = document.querySelector('#post-id').value?.trim();
  const comment_text = document.querySelector('#comment-content').value?.trim();

  if (post_id && comment_text) {
    const response = await fetch('/dashboard/comments/new', {
      method: 'POST',
      body: JSON.stringify({ post_id, comment_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create comment');
    }
  }
};

// Add an event listener to the new comment form to listen for a submit event and call the newCommentHandler function
document
  .querySelector('#new-comment-form')
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
      // Remove the deleted comment from the DOM
      event.target.parentElement.remove();
    } else {
      alert('Failed to delete comment');
    }
  }
};
// Add an event listener to each comment's delete button to listen for a click event and call the deleteCommentHandler function
document.querySelectorAll('#delete-comment-btn').forEach((button) => {
  button.addEventListener('click', deleteCommentHandler);
});
