const produtos = [
  {
    nome: "Camisa Preta",
    foto: "camisa-preta.jpg"
  },
  {
    nome: "Camisa Azul Marinho",
    foto: "camisa-azul.jpg"
  },
  {
    nome: "Camisa Branca",
    foto: "camisa-branca.jpg"
  }
];

function renderizarProdutos() {
  const container = document.getElementById("produtos");
  const template = document.getElementById("produto-template");

  produtos.forEach((produto, index) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".nome").textContent = produto.nome;
    clone.querySelector(".foto").src = produto.foto;

    // Adiciona classes com index para recuperar depois
    ["P", "M", "G", "GG"].forEach(t => {
      clone.querySelector(`.qtde-${t}`).classList.add(`qtde-${t}-${index}`);
    });

    container.appendChild(clone);
  });
}

function finalizarPedido() {
  let mensagem = "Olá! Gostaria de fazer um pedido:

";
  let total = 0;

  produtos.forEach((produto, index) => {
    let qtds = {};
    ["P", "M", "G", "GG"].forEach(t => {
      const valor = parseInt(document.querySelector(`.qtde-${t}-${index}`).value) || 0;
      if (valor > 0) qtds[t] = valor;
    });

    const totalProduto = Object.values(qtds).reduce((a, b) => a + b, 0);
    if (totalProduto > 0) {
      total += totalProduto;
      const detalhes = Object.entries(qtds).map(([t, v]) => `${v}x ${t}`).join(", ");
      mensagem += `🧥 ${produto.nome} → ${detalhes}
`;
    }
  });

  if (total === 0) {
    alert("Selecione pelo menos uma unidade.");
    return;
  }

  let preco = 0;
  if (total === 1) preco = 70;
  else if (total === 2) preco = 120;
  else if (total === 3) preco = 150;
  else preco = 150 + (total - 3) * 50;

  mensagem += `
💰 Total: R$${preco}`;
  const numero = "5546991081743";
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank");
}

document.addEventListener("DOMContentLoaded", renderizarProdutos);