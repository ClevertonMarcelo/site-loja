
// Atualizar imagem do banner
function atualizarBanner(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('bannerImagem').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Atualizar imagem do logo
function atualizarLogo(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('logo').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Dados simulados para teste
const produtos = [
  {
    nome: "Camisa Polo Masculina",
    marca: "LYNCO",
    cor: "Preto",
    tamanhos: ["P", "M", "G", "GG"],
    foto: "produto.jpg"
  }
];

function carregarFiltros() {
  const marcas = new Set();
  const cores = new Set();

  produtos.forEach(p => {
    marcas.add(p.marca);
    cores.add(p.cor);
  });

  const marcaSelect = document.getElementById("filtroMarca");
  const corSelect = document.getElementById("filtroCor");

  marcas.forEach(m => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = m;
    marcaSelect.appendChild(opt);
  });

  cores.forEach(c => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = c;
    corSelect.appendChild(opt);
  });
}

function aplicarFiltros() {
  const marca = document.getElementById("filtroMarca").value;
  const cor = document.getElementById("filtroCor").value;
  const tamanho = document.getElementById("filtroTamanho").value;

  const container = document.getElementById("produtos");
  container.innerHTML = "";

  produtos.forEach(produto => {
    if (
      (marca === "" || produto.marca === marca) &&
      (cor === "" || produto.cor === cor) &&
      (tamanho === "" || produto.tamanhos.includes(tamanho))
    ) {
      const template = document.getElementById("produto-template");
      const clone = template.content.cloneNode(true);
      clone.querySelector(".foto").src = produto.foto;
      clone.querySelector(".nome").textContent = produto.nome;
      clone.querySelector(".marca").textContent = "Marca: " + produto.marca;
      clone.querySelector(".cor").textContent = "Cor: " + produto.cor;

      const selectTamanho = clone.querySelector(".tamanho");
      selectTamanho.innerHTML = '<option value="">Escolha o tamanho</option>';
      produto.tamanhos.forEach(t => {
        const opt = document.createElement("option");
        opt.value = opt.textContent = t;
        selectTamanho.appendChild(opt);
      });

      const btn = clone.querySelector(".whatsapp");
      btn.onclick = function () {
        const tamanhoEscolhido = selectTamanho.value;
        if (!tamanhoEscolhido) {
          alert("Escolha um tamanho antes de fazer o pedido.");
          return;
        }
        const msg = `Olá! Gostaria de pedir o produto: ${produto.nome}, cor: ${produto.cor}, tamanho: ${tamanhoEscolhido}`;
        const url = `https://wa.me/5546991081743?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
      };

      container.appendChild(clone);
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  carregarFiltros();
  aplicarFiltros();
});
