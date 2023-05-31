// logs user out
const newFormHandler = async function(event) {
  event.preventDefault();

  // grab dom els
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  // api call to create new post
  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // after new post creation, return user to dashboard
  document.location.replace('/dashboard');
};

// listener for submit button
document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
