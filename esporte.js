// Importa as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

  // Função para carregar os comentários do Firestore
  async function loadComments() {
    console.log("Carregando comentários...");
    commentsContainer.innerHTML = ''; // Limpa os comentários existentes

    // Recupera os comentários ordenados pela data
    const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    console.log(`Comentários carregados: ${querySnapshot.size}`);
    // Exibe os comentários
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
    const userName = localStorage.getItem('userName') || 'Usuário Anônimo'; // Nome padrão se não encontrado
    const userPhoto = localStorage.getItem('userPhoto'); // Foto do usuário do LocalStorage
  
    console.log("Comentário enviado");
    console.log(`Texto do comentário: ${commentText}`);
    console.log(`Nome do usuário: ${userName}, Foto do usuário: ${userPhoto}`);
  
    if (commentText.trim() !== '') {
      try {
        console.log("Adicionando comentário no Firestore...");
        // Adiciona o comentário no Firestore
        await addDoc(collection(db, "comments"), {
          name: userName,
          photo: userPhoto || 'imagens/blank-profile-picture-973460_1280.png', // Foto padrão se não houver
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
