// Pega a tag form
const form = document.querySelector("form");
// Pega input com id name
const inputUser = document.querySelector("#name");

// Essas duas tags servem para receber as informações do usuário
// Pega tag img com id user-img
const userImg = document.querySelector("#user-img");
// Pega tag span com id user-name
const userName = document.getElementById("user-name");

// Essas duas tags serão para alterar estilização do display, ou seja, mostrar ou esconder seu conteúdo
// Pega container (div) com as informações do usuário
const userContainer = document.getElementById("container-user");
// Pega span que irá mostrar o erro
const userError = document.querySelector("#message-error");
// Função que busca usuário no github e atualiza o html
const getUserGithub = async () => {
  try {
    // console.log(inputUser.value);
    const res = await fetch(`https://api.github.com/users/${inputUser.value}`);
    const data = await res.json();
    if (data.message === "Not Found") {
      throw Error("Usuário não encontrado");
    }
    // Insere usuário no localstorage
    localStorage.setItem("github-user", inputUser.value);
    userError.style.display = "none";
    // Altera o atributo src da tag img
    userImg.src = data.avatar_url;
    // Altera o atributo alt da tag img
    userImg.alt = data.name;
    // Altera o conteúdo da tag span
    userName.innerText = data.name;
    userContainer.style.display = "flex";
    console.log(data);
  } catch (error) {
    userContainer.style.display = "none";
    userError.style.display = "block";
    userError.innerText = "Usuário não encontrado";
  }
};
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Chama função para buscar usuário
  await getUserGithub();
});
window.onload = async () => {
  // Pega usuário do localstorage
  const githubUser = localStorage.getItem("github-user");
  // Atribui usuário ao input
  inputUser.value = githubUser;
  if (githubUser) {
    // Chama função para buscar usuário
    await getUserGithub();
  }
};
// // Cria/atualiza chave e insere valor
// localStorage.setItem("chave","valor")
// // Pega valor da chave
// localStorage.getItem("chave")
// // Apaga chave e valor
// localStorage.removeItem("chave")

// const carrinho = [
//   {
//     id: 1,
//     qnt: 10,
//     valorTotal: 200.5,
//   },
//   {
//     id: 2,
//     qnt: 5,
//     valorTotal: 99.5,
//   },
// ];
// localStorage.setItem("meu-ecommerce@carrinho", JSON.stringify(carrinho));

// const carrinho2 = JSON.parse(localStorage.getItem("meu-ecommerce@carrinho"));
// console.log(carrinho2);

const removeLocalstorageBtn = document.getElementById("remove-localstorage");

removeLocalstorageBtn.onclick = () => {
  localStorage.removeItem("github-user");
};