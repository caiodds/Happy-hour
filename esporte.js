document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado e obtém seus dados
    const userData = JSON.parse(localStorage.getItem('users'));
    const currentUser = userData ? userData[userData.length - 1] : null;  // Pega o último usuário cadastrado

    if (!currentUser) {
        // Se o usuário não estiver logado, redireciona para a página de cadastro
        window.location.href = 'cadastro.html';
        return;
    }

    // Exibe a área de comentário
    const commentBtn = document.getElementById('comment-btn');
    const commentArea = document.getElementById('comment-area');
    const submitCommentBtn = document.getElementById('submit-comment');

    commentBtn.addEventListener('click', function() {
        commentArea.style.display = 'block';  // Exibe a área para o comentário
    });

    submitCommentBtn.addEventListener('click', function() {
        const commentText = document.getElementById('comment-text').value;
        if (commentText) {
            const comment = {
                name: currentUser.name,
                photo: currentUser.photo || 'imagens/default-avatar.jpg',  // Foto do usuário ou uma padrão
                text: commentText,
                date: new Date().toLocaleString()
            };

            // Armazena o comentário no localStorage
            const comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments.push(comment);
            localStorage.setItem('comments', JSON.stringify(comments));

            // Exibe o comentário na página
            displayComments();

            // Limpa o campo de texto após o comentário
            document.getElementById('comment-text').value = '';
            commentArea.style.display = 'none';  // Esconde a área de comentário após o envio
        }
    });

    // Função para exibir os comentários
    function displayComments() {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';  // Limpa os comentários antes de exibir novamente
        const comments = JSON.parse(localStorage.getItem('comments')) || [];

        comments.forEach(function(comment) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="${comment.photo}" class="comment-photo" alt="Foto de perfil">
                    <h4>${comment.name}</h4>
                    <small>${comment.date}</small>
                </div>
                <p>${comment.text}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    // Exibe os comentários existentes ao carregar a página
    displayComments();
});
