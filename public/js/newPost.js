// Initiate new post creation.
const newPost = async (event) => {
  // This prevents the default action of the event from happening.
  event.preventDefault();
  // These two variables are used to grab the title and content of the post by selecting the elements by their id and trimming the whitespace.
  const title = document.querySelector('#post-title').value.trim();
  const post_content = document.querySelector('#post-content').value.trim();
  // The if statement here is used to iterate through the title and the content to check if they are not empty.
  if (title && post_content) {
    // This variable is used to make a fetch request to the server to create a new post if the title and content are not empty.
    const response = await fetch('/dashboard/posts/new', {
      method: 'POST',
      body: JSON.stringify({ title, post_content }),
      headers: { 'Content-Type': 'application/json' },
    });
    // This if statement is used to check if the response is ok and if it is not, an alert is displayed.
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};
// This code is used to listen for the submit event on the newPostForm and call the newPost function.
document.querySelector('#newPostForm').addEventListener('submit', newPost);
