// Importa as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOPInYefijpkxgv6g6w8zutgl-GywW5hw",
  authDomain: "hubby-2e015.firebaseapp.com",
  projectId: "hubby-2e015",
  storageBucket: "hubby-2e015.firebasestorage.app",
  messagingSenderId: "658401159787",
  appId: "1:658401159787:web:a5f63d4b76df0acfba5f2e",
  measurementId: "G-8VNNW9M9RT"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);



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
// Função para postar comentário no Firestore
document.getElementById('submit-comment').addEventListener('click', async () => {
    const commentText = document.getElementById('comment-text').value;
    const userName = localStorage.getItem('userName'); // Obtém o nome do usuário do LocalStorage
    const userPhoto = localStorage.getItem('userPhoto'); // Obtém a foto do usuário do LocalStorage
  
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
  