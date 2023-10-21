const productList = document.querySelector('.products-container');
const btnLogout = document.getElementById('logout');

productList.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const pid = e.target.getAttribute('id');

  const userRes = await fetch('http://localhost:8080/current');
  const userData = res.json();

  /* const res = await fetch(`http://localhost:8080/${cid}/products/${pid}`); */
});

btnLogout.addEventListener('click', async (e) => {
  try {
    const res = await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    window.location.href = data.url;
  } catch (error) {
    console.log(error);
  }
});
