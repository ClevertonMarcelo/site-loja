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

  produtos.forEach(produto => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".nome").textContent = produto.nome;
    clone.querySelector(".foto").src = produto.foto;

    const btn = clone.querySelector(".whatsapp");
    btn.onclick = () => {
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

      const resumo = [];
      if (qtdeP) resumo.push(`${qtdeP}x P`);
      if (qtdeM) resumo.push(`${qtdeM}x M`);
      if (qtdeG) resumo.push(`${qtdeG}x G`);
      if (qtdeGG) resumo.push(`${qtdeGG}x GG`);

      const msg = `Olá! Gostaria de comprar ${produto.nome} nas quantidades: ${resumo.join(', ')}. Total: R$${preco}`;
      window.open(`https://wa.me/5546991081743?text=${encodeURIComponent(msg)}`, "_blank");
    };

    container.appendChild(clone);
  });
}

document.addEventListener("DOMContentLoaded", renderizarProdutos);