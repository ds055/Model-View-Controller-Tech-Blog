// logs user in
const loginFormHandler = async function(event) {
  event.preventDefault();

  // grab dom els
  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  // api call to log user in 
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // if successful, forward user to their dashboard
   if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login');
  }
};

// event listener for submit button
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
