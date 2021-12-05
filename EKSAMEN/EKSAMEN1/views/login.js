

document.addEventListener('DOMContentLoaded', function () {
    let button = document.getElementById('createUser');
  
    document.getElementById('loginform').addEventListener('submit', (e) => {
      e.preventDefault();
  
      let emailaddress = document.getElementById('email').value;
      let passwordcode = document.getElementById('password').value;
  
      let user = {
        id: null,
        email: emailaddress,
        password: passwordcode,
      };
  
      fetch('http://localhost:9000/users/login', {
        //det bliver dens route
  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
  
        body: JSON.stringify(user), // dette bliver sendt til serveren
      })
        .then((response) => response.json())
        .then((info) => {
          if (info) {
            localStorage.setItem('user', JSON.stringify(user));
            location.href = '/product.html';
          } else {
            window.alert(info);
          }
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    });
  });
  
  
  
  