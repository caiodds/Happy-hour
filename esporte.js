document.getElementById("comment-btn").addEventListener("click", () => {
    // Verifica se o usuário está logado
    const userData = JSON.parse(localStorage.getItem("users"));
    if (!userData || userData.length === 0) {
        // Se não houver dados de usuário, redireciona para a página de cadastro
        alert("Por favor, faça o login antes de comentar.");
        window.location.href = "cadastro.html";
    } else {
        // Exibe a área de comentário diretamente
        document.getElementById("comment-area").style.display = "block";
    }
});

document.getElementById("submit-comment").addEventListener("click", () => {
    const userData = JSON.parse(localStorage.getItem("users"));
    const user = userData[userData.length - 1]; // Pega o último usuário cadastrado
    const commentText = document.getElementById("comment-text").value.trim();

    if (commentText) {
        // Cria um novo comentário
        const comment = {
            name: user.name, // Pega o nome do usuário
            photo: user.photo || "imagens/blank-profile-picture-973460_1280.png", // Se não houver foto, usa a foto padrão
            text: commentText,
            date: new Date().toLocaleString()
        };

        // Adiciona o comentário na lista
        const commentsContainer = document.getElementById("comments-container");
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
            <div class="comment-header">
                <img src="${comment.photo}" class="comment-photo" alt="Foto do usuário">
                <span class="comment-name">${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
        `;
        commentsContainer.appendChild(commentElement);

        // Limpa o campo de comentário
        document.getElementById("comment-text").value = "";

        // Salva os comentários no localStorage para persistência
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(comments));
    } else {
        alert("Por favor, escreva um comentário.");
    }
});

// Carrega os comentários salvos no localStorage
window.addEventListener("load", () => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const commentsContainer = document.getElementById("comments-container");
    comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
            <div class="comment-header">
                <img src="${comment.photo}" class="comment-photo" alt="Foto do usuário">
                <span class="comment-name">${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
});
