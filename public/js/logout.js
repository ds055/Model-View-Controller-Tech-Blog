// logs user out by destroying session
const logout = async function() {
  // api call to destroy session
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // on success, return to user to homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

// event listener for logout link click
document.querySelector('#logout-link').addEventListener('click', logout);
