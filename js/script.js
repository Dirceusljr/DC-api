let form = document.getElementById("form");
let nome = document.getElementById("nome");
let preco = document.getElementById("preco");
let descricao = document.getElementById("descricao");
let idProduto = location.search.replace("?id=", "");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  nome = nome.value;
  preco = preco.value;
  descricao = descricao.value;

  let id = '';
  let method = 'POST'

  if(parseInt(idProduto) >= 0) {
    id = idProduto
    method = 'PUT'
  }

  await fetch(`http://localhost:3030/produtos/${id}`, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ nome, preco, descricao }),
  }).then((response) => {
    console.log(response);
  });
});

if (parseInt(idProduto) >= 0) {
  fetch(`http://localhost:3030/produtos/${idProduto}`).then(async (response) => {
    let body = await response.json();
    nome.value = body.nome;
    preco.value = body.preco;
    descricao.value = body.descricao
  });
}