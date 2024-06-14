document.addEventListener('DOMContentLoaded', () => {
  const editPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#post_content').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    if (title && content) {
      const response = await fetch(`/api/posts/editpost/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_content: content }), // Update the post_content value
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    }
  };

  document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editPost);

  const deletePost = async (event) => {
    event.preventDefault();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/editpost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  };

  document
    .querySelector('#delete-post-btn')
    .addEventListener('click', deletePost);
});
