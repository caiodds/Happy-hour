document.addEventListener('DOMContentLoaded', function() {
    const commentBtn = document.getElementById('comment-btn');
    const commentArea = document.getElementById('comment-area');
    const submitCommentBtn = document.getElementById('submit-comment');
    const commentsContainer = document.getElementById('comments-container');

    // Função para carregar os comentários do localStorage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsContainer.innerHTML = ''; // Limpa os comentários existentes

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="${comment.photo || 'imagens/default-avatar.jpg'}" class="comment-photo" alt="Foto de perfil">
                    <h4>${comment.name}</h4>
                    <small>${comment.date}</small>
                </div>
                <p>${comment.text}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    // Exibe os comentários quando a página carrega
    loadComments();

    // Exibe a área para o usuário escrever o comentário
    commentBtn.addEventListener('click', function() {
        commentArea.style.display = 'block';
    });

    // Quando o comentário é enviado
    submitCommentBtn.addEventListener('click', function() {
        const commentText = document.getElementById('comment-text').value;
        const userData = JSON.parse(localStorage.getItem('users'));

        if (commentText && userData && userData.length > 0) {
            const currentUser = userData[userData.length - 1]; // Pega o último usuário cadastrado
            const newComment = {
                name: currentUser.name,
                photo: currentUser.photo || 'imagens/default-avatar.jpg',  // Foto do usuário ou uma padrão
                text: commentText,
                date: new Date().toLocaleString()
            };

            // Adiciona o novo comentário no localStorage
            const comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(comments));

            // Limpa a área de comentário
            document.getElementById('comment-text').value = '';
            commentArea.style.display = 'none';

            // Atualiza os comentários exibidos
            loadComments();
        }
    });
});
