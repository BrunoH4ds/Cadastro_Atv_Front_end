const user = JSON.parse(sessionStorage.getItem('registration'));

if (user) {
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userBirth').textContent = user.birth;
} else {
  window.location.href = 'index.html';
}

function handleLogout(event) {
  event.preventDefault();

  sessionStorage.removeItem('registration');

  window.location.href = 'index.html';
}