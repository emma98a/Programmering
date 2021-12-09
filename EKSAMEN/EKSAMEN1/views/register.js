document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded');
    let button = document.getElementById('createUser');
  
    button.addEventListener('click', (e) => {
      e.preventDefault();
  
      let emailaddress = document.getElementById('email').value;
      let passwordcode = document.getElementById('password').value;
  
      var UserID = 'id' + Date.now().toString(36);
      let newUser = {
        id: UserID,
        email: emailaddress,
        password: passwordcode,
      };
  
      fetch('http://localhost:9000/users/create', {
        //det bliver dens route
  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
  
        body: JSON.stringify(newUser), // dette bliver sendt til serveren
      })
        .then((response) => response.json())
        .then((info) => {
          console.log(info);
          location.href = '/login.html';
          alert("Success! User added")
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    });
  });
  