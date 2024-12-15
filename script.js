document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Criptografando a senha digitada
    const hashedPassword = sha256(password);

    // Buscar usuários no localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Procurar o usuário correspondente ao e-mail
    const user = users.find(user => user.email === email);

    if (user && user.password === hashedPassword) {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html';  // Redireciona para a página principal ou dashboard
    } else {
        alert('E-mail ou senha incorretos!');
    }
});
