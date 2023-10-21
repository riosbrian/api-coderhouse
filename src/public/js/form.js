const ROUTE = 'http://localhost:8080/api/auth/';

const loginForm = document.querySelector('.form');

const authForm = document.querySelector('.form');
let endpoint = 'login';
let userData = {};

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  endpoint = authForm.getAttribute('auth');
  const formData = new FormData(e.target);

  if (endpoint === 'register') {
    userData = {
      name: formData.get('name'),
      lastname: formData.get('lastname'),
      username: formData.get('username'),
      email: formData.get('email'),
      age: formData.get('age'),
      password: formData.get('password'),
    };
  } else {
    userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
  }

  console.log(userData);

  try {
    const res = await fetch(`${ROUTE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.error) return alert(data.message);
    window.location.href = data.url;
  } catch (error) {
    console.log(error);
  }
});

/* error: false,
code: 200,
message: 'Usuario creado correctamente',
payload: newUser,
redirect: true,
url: '/products', */

/* error: true,
code: 401,
message: `Error creando usuario: ${error}`,
redirect: false, */

/*loginForm.addEventListener('submit', async (e) => {
  try {
    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (res.redirected) window.location.href = res.url;
    const data = await res.json();
    if (data.redirect === true) {
      // Redirigir al usuario a la página "/products"
      window.location.href = data.url;
    }

    console.log(data);
  } catch (error) {
    console.log('front', error);
  }
});*/
