// Função para abrir o modal
document.getElementById("comment-btn").addEventListener("click", function() {
    document.getElementById("name-modal").style.display = "flex";
});

// Função para fechar o modal
document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("name-modal").style.display = "none";
});

// Função para carregar os comentários ao carregar a página
function loadComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let commentSection = document.getElementById("comments-container");

    comments.forEach(comment => {
        let newComment = document.createElement("div");
        newComment.classList.add("comment");
        newComment.innerHTML = `<h4>${comment.name}</h4><p>${comment.text}</p>`;
        commentSection.appendChild(newComment);
    });
}

// Função para salvar o comentário no LocalStorage
document.getElementById("submit-name").addEventListener("click", function() {
    let userName = document.getElementById("user-name").value;
    if (userName) {
        // Fecha o modal
        document.getElementById("name-modal").style.display = "none";
        document.getElementById("user-name").value = "";

        // Libera a área de comentário
        document.getElementById("comment-area").style.display = "block";

        // Função para enviar o comentário e salvar no LocalStorage
        document.getElementById("submit-comment").addEventListener("click", function() {
            let commentText = document.getElementById("comment-text").value;
            if (commentText) {
                // Armazenar o comentário no LocalStorage
                let comments = JSON.parse(localStorage.getItem("comments")) || [];
                comments.push({ name: userName, text: commentText });
                localStorage.setItem("comments", JSON.stringify(comments));

                // Exibe o novo comentário
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

// Carregar os comentários quando a página é carregada
window.onload = function() {
    loadComments();
};
