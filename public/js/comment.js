// This function is used to handle the submission of a new comment
const newCommentHandler = async (event) => {
  event.preventDefault();
  const post_id = document.querySelector('#post-id').value?.trim();
  const comment_text = document.querySelector('#comment-content').value?.trim();
  // This if statment checks if the post_id and comment_text exist
  if (post_id && comment_text) {
    const response = await fetch(`/api/comments/newComment`, {
      method: 'POST',
      body: JSON.stringify({ post_id, comment_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Clear the comment form after successful submission
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
