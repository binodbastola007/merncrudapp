$(document).ready(function() {
  // Register User
  $('#registerForm').submit(function(event) {
    event.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();

    axios.post('http://localhost:5000/users/register', { username, password })
      .then(response => {
        alert(response.data.message);
        $('#registerForm')[0].reset();
        loadUsers();
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  });

  // Login User
  $('#loginForm').submit(function(event) {
    event.preventDefault();
    const username = $('#loginUsername').val();
    const password = $('#loginPassword').val();

    axios.post('http://localhost:5000/users/login', { username, password })
      .then(response => {
        alert('Login successful');
        $('#loginForm')[0].reset();
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  });

  // Reset Password
  $('#resetForm').submit(function(event) {
    event.preventDefault();
    const username = $('#resetUsername').val();
    const newPassword = $('#newPassword').val();

    axios.post('http://localhost:5000/users/reset-password', { username, newPassword })
      .then(response => {
        alert(response.data.message);
        $('#resetForm')[0].reset();
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  });

  // Load Users
  function loadUsers() {
    axios.get('http://localhost:5000/users')
      .then(response => {
        const users = response.data;
        const tbody = $('#usersTable tbody');
        tbody.empty();
        users.forEach(user => {
          const tr = $('<tr>');
          const usernameTd = $('<td>').text(user.username);
          const actionsTd = $('<td>');
          const viewBtn = $('<button>').text('View').addClass('btn btn-info');
          viewBtn.click(() => {
            $('#modalUsername').text(user.username);
            $('#userModal').modal('show');
          });
          actionsTd.append(viewBtn);
          tr.append(usernameTd, actionsTd);
          tbody.append(tr);
        });
      })
      .catch(error => {
        alert('Error loading users');
      });
  }

  loadUsers();
});
