
const produtos = [
  {
    nome: "Camisa Preta",
    cor: "Preta",
    foto: "camisa-preta.jpg"
  },
  {
    nome: "Camisa Azul Marinho",
    cor: "Azul Marinho",
    foto: "camisa-azul.jpg"
  },
  {
    nome: "Camisa Branca",
    cor: "Branca",
    foto: "camisa-branca.jpg"
  }
];

function renderizarProdutos() {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  produtos.forEach(produto => {
    const template = document.getElementById("produto-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".foto").src = produto.foto;
    clone.querySelector(".nome").textContent = produto.nome;
    clone.querySelector(".cor").textContent = "Cor: " + produto.cor;

    const btn = clone.querySelector(".whatsapp");
    btn.onclick = function () {
      const qtdeP = parseInt(clone.querySelector(".qtde-P").value) || 0;
      const qtdeM = parseInt(clone.querySelector(".qtde-M").value) || 0;
      const qtdeG = parseInt(clone.querySelector(".qtde-G").value) || 0;
      const qtdeGG = parseInt(clone.querySelector(".qtde-GG").value) || 0;
      const total = qtdeP + qtdeM + qtdeG + qtdeGG;

      if (total === 0) {
        alert("Selecione pelo menos uma unidade.");
        return;
      }

      let preco = 0;
      if (total === 1) preco = 70;
      else if (total === 2) preco = 120;
      else if (total === 3) preco = 150;
      else preco = 150 + (total - 3) * 50;

      let detalhes = [];
      if (qtdeP) detalhes.push(`${qtdeP}x P`);
      if (qtdeM) detalhes.push(`${qtdeM}x M`);
      if (qtdeG) detalhes.push(`${qtdeG}x G`);
      if (qtdeGG) detalhes.push(`${qtdeGG}x GG`);

      const msg = `Olá! Gostaria de pedir ${total} camisa(s) ${produto.cor}: ${detalhes.join(', ')} - Total: R$${preco}`;
      const url = `https://wa.me/5546991081743?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    };

    container.appendChild(clone);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarProdutos();
});
