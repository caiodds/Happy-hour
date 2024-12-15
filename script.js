document.addEventListener('DOMContentLoaded', function() {
    console.log("O script foi carregado!");

    const commentBtn = document.getElementById('comment-btn');
    const commentArea = document.getElementById('comment-area');
    const submitCommentBtn = document.getElementById('submit-comment');
    const commentsContainer = document.getElementById('comments-container');

    // Função para carregar os comentários do Firestore
    async function loadComments() {
        commentsContainer.innerHTML = ''; // Limpa os comentários existentes
        console.log("Carregando comentários...");
        const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        console.log(`Comentários carregados: ${querySnapshot.size}`);

        querySnapshot.forEach(doc => {
            const commentData = doc.data();
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="${commentData.photo || 'imagens/default-avatar.jpg'}" class="comment-photo" alt="Foto de perfil">
                    <h4>${commentData.name}</h4>
                    <small>${new Date(commentData.timestamp.seconds * 1000).toLocaleString()}</small>
                </div>
                <p>${commentData.comment}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    // Exibe os comentários quando a página carrega
    loadComments();

    // Exibe a área para o usuário escrever o comentário
    commentBtn.addEventListener('click', function() {
        console.log("Botão de comentar clicado");
        commentArea.style.display = 'block';
    });

    // Quando o comentário é enviado
    submitCommentBtn.addEventListener('click', async function() {
        const commentText = document.getElementById('comment-text').value;
        const userName = localStorage.getItem('userName'); // Obtém o nome do usuário do LocalStorage
        const userPhoto = localStorage.getItem('userPhoto'); // Obtém a foto do usuário do LocalStorage

        console.log("Comentário enviado");
        if (commentText.trim() !== '') {
            try {
                // Adiciona o comentário no Firestore
                await addDoc(collection(db, "comments"), {
                    name: userName,
                    photo: userPhoto || 'imagens/blank-profile-picture-973460_1280.png', // Foto padrão se não houver uma foto
                    comment: commentText,
                    timestamp: serverTimestamp() // Marca o momento de postagem
                });

                // Limpa o campo de comentário
                document.getElementById('comment-text').value = '';
                alert('Comentário postado com sucesso!');
                loadComments(); // Atualiza os comentários após postar
            } catch (error) {
                console.error('Erro ao postar comentário: ', error);
            }
        } else {
            alert('Por favor, escreva um comentário.');
        }
    });
});
