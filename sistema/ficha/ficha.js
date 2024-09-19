function titleize(text) {
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];

        var firstLetter = w[0];
        w = firstLetter.toUpperCase() + w.slice(1);

        words[a] = w;
    }
    return words.join(" ");
}

// Função para aplicar o titleize ao campo de título e nome antes de enviar o formulário
function aplicarTitleize() {
    const tituloInput = document.getElementById('tituloTrabalho');
    const nomeInput = document.getElementById('nome');

    // Atualiza os valores dos inputs com o texto formatado
    tituloInput.value = titleize(tituloInput.value);
    nomeInput.value = titleize(nomeInput.value);
}

let contadorAssuntos = 1; // Inicia com 1 porque já existe um campo de assunto

// Função para adicionar um novo campo de assunto
function adicionarAssunto() {
    if (contadorAssuntos < 5) {
        contadorAssuntos++; // Incrementa o contador

        // Cria um novo input para o assunto
        const novoAssunto = document.createElement('input');
        novoAssunto.type = 'text';
        novoAssunto.name = 'assunto' + contadorAssuntos;
        novoAssunto.placeholder = 'Assunto ' + contadorAssuntos;
        novoAssunto.required = true;

        // Adiciona o novo input ao formulário
        const divAssuntos = document.getElementById('divAssuntos');
        divAssuntos.appendChild(novoAssunto);
    }

    // Se o contador for igual a 5, esconde o botão
    if (contadorAssuntos === 5) {
        document.getElementById('botaoAdicionarAssunto').style.display = 'none';
    }
}

let contadorCoorientador = 1; // Inicia com 1 porque já existe um campo de coorientador

// Função para adicionar novos campos de nome e sobrenome do coorientador
function adicionarCoorientador() {
    if (contadorCoorientador < 5) {
        contadorCoorientador++; // Incrementa o contador

        // Cria um novo input para o nome do coorientador
        const novoCoorientadorNome = document.createElement('input');
        novoCoorientadorNome.type = 'text';
        novoCoorientadorNome.name = 'nomeCoorientador' + contadorCoorientador;
        novoCoorientadorNome.pattern = '[A-Za-zÀ-ÿ\\s]+';
        novoCoorientadorNome.title = 'Apenas letras e espaços são permitidos.';
        novoCoorientadorNome.placeholder = 'Nome:';
        novoCoorientadorNome.required = true;

        // Cria um novo input para o sobrenome do coorientador
        const novoCoorientadorSobrenome = document.createElement('input');
        novoCoorientadorSobrenome.type = 'text';
        novoCoorientadorSobrenome.name = 'sobrenomeCoorientador' + contadorCoorientador;
        novoCoorientadorSobrenome.pattern = '[A-Za-zÀ-ÿ\\s]+';
        novoCoorientadorSobrenome.title = 'Apenas letras e espaços são permitidos.';
        novoCoorientadorSobrenome.placeholder = 'Sobrenome:';
        novoCoorientadorSobrenome.required = true;

        // Adiciona os novos inputs ao contêiner de coorientadores
        const divCoorientador = document.getElementById('divCoorientador');
        divCoorientador.appendChild(novoCoorientadorNome);
        divCoorientador.appendChild(novoCoorientadorSobrenome);
    }

    // Se o contador for igual a 5, esconde o botão
    if (contadorCoorientador === 5) {
        document.getElementById('botaoAdicionarCoorientador').style.display = 'none'; // Esconde o botão
    }
}

