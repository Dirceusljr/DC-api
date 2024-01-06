let tbody = document.getElementById("tbody");

function deletarProduto(id, elemento) {
  fetch(`http://localhost:3030/produtos/${id}`, {
    method: "DELETE",
  }).then(async (response) => {
    let body = await response.json();

    if (typeof body === "object") {
      fetch("http://localhost:3030/produtos").then(async (response) => {
        let body = await response.json();
        listarProdutos(body);
      });
    }
  });
}

function listarProdutos(produtos) {
    tbody.innerHTML = ''
  produtos.forEach((produto) => {
    let linha = `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.descricao}</td>
                <td style="display: flex; gap: 20px">
                    <a href="index.html?id=${produto.id} ">Editar</a>
                    <a href="#" onclick="deletarProduto(${produto.id}, this)" style= "color: red">Excluir</a>
                </td>
            </tr>
        `;

    tbody.insertAdjacentHTML("beforeend", linha);
  });
}

fetch("http://localhost:3030/produtos").then(async (response) => {
  let body = await response.json();
  listarProdutos(body);
});
