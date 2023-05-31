// used to sign up new user
const signupFormHandler = async function(event) {
  event.preventDefault();

  // grab DOM els
  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');

  // api call to create new user
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // return user to dashboard if creation successful 
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to sign up');
  }
};

// event listener for submit button
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
