// creates a comment
const commentFormHandler = async function(event) {
  event.preventDefault();

  // grab dom els
  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  // api call to create comment
  if (body) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // reload page if comment creation successful
    document.location.reload();
  }
};

// event listener for submit button
document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
