// Função para abrir o modal
document.getElementById("comment-btn").addEventListener("click", function() {
    document.getElementById("name-modal").style.display = "flex";
});

// Função para fechar o modal
document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("name-modal").style.display = "none";
});

// Função para enviar o nome e liberar a área de comentário
document.getElementById("submit-name").addEventListener("click", function() {
    let userName = document.getElementById("user-name").value;
    if (userName) {
        // Fecha o modal
        document.getElementById("name-modal").style.display = "none";
        document.getElementById("user-name").value = "";

        // Libera a área de comentário
        document.getElementById("comment-area").style.display = "block";

        // Armazena o nome do usuário para utilizá-lo nos comentários
        document.getElementById("submit-comment").addEventListener("click", function() {
            let commentText = document.getElementById("comment-text").value;
            if (commentText) {
                let commentSection = document.getElementById("comments-container");
                let newComment = document.createElement("div");
                newComment.classList.add("comment");
                newComment.innerHTML = `<h4>${userName}</h4><p>${commentText}</p>`;
                commentSection.appendChild(newComment);

                // Limpa o campo de comentário após envio
                document.getElementById("comment-text").value = "";
            } else {
                alert("Por favor, escreva seu comentário.");
            }
        });
    } else {
        alert("Por favor, digite seu nome.");
    }
});
