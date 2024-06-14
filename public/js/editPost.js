// The editPost.js file is used to seperate the logic of an action from the route that is being used. The editPost function is used to edit a post and the deletePost function is used to delete a post.
document.addEventListener('DOMContentLoaded', () => {
  // This function is used to edit a post
  const editPost = async (event) => {
    // This prevents the default action of the event from happening
    event.preventDefault();
    // This code is used to get the title and content of the post
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#post_content').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // This code is used to make a fetch request to the server to edit the post if the title and the content are not empty
    if (title && content) {
      const response = await fetch(`/api/posts/editpost/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_content: content }),
        headers: { 'Content-Type': 'application/json' },
      });
      // This code is used to check if the response is ok and if it is not, an alert is displayed
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    }
  };
  // This code is used to listen for the submit event on the edit-post-form and call the editPost function
  document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editPost);
  // This function is used to delete a post
  const deletePost = async (event) => {
    event.preventDefault();
    // This code is used to get the id of the post
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // This code is used to make a fetch request to the server to delete the post
    const response = await fetch(`/api/posts/editpost/${id}`, {
      method: 'DELETE',
    });
    // This if statement is used to check if the response is ok and if it is not, an alert is displayed
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  };
  // This is used to listen for the click event on the delete-post-btn and call the deletePost function
  document
    .querySelector('#delete-post-btn')
    .addEventListener('click', deletePost);
});
