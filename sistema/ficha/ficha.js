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

// Função para aplicar titleize a um campo de input
function aplicarTitleize(inputId) {
    const input = document.getElementById(inputId);
    input.value = titleize(input.value);
}


let contadorAssuntos = 1; // Inicia com 1 porque já existe um campo de assunto

function adicionarAssunto() {
    if (contadorAssuntos < 5) {
        contadorAssuntos++; // Incrementa o contador

        // Cria um novo input para o assunto
        const novoAssunto = document.createElement('input');
        novoAssunto.type = 'text';
        novoAssunto.name = 'assunto' + contadorAssuntos;
        novoAssunto.placeholder = 'Assunto ' + contadorAssuntos;
        novoAssunto.required = true;

        // Adiciona o novo input ao contêiner de assuntos
        const divAssuntos = document.getElementById('divAssuntos');
        divAssuntos.appendChild(novoAssunto);

        // Se o contador for igual a 5, esconde o botão
        if (contadorAssuntos === 5) {
            document.getElementById('ibotaoAdicionarAssunto').style.display = 'none';
        }
        if (contadorAssuntos > 1) {
            document.getElementById('ibotaoRemoverAssunto').style.display = 'inline';
        }
    }
}

function removerAssunto() {
    if (contadorAssuntos > 1) {
        const divAssuntos = document.getElementById('divAssuntos');
        
        // Remove o último input de assunto adicionado
        divAssuntos.removeChild(divAssuntos.lastChild);

        contadorAssuntos--; // Decrementa o contador

        // Esconde o botão "Remover Assunto" se restar apenas 1 assunto
        if (contadorAssuntos === 1) {
            document.getElementById('ibotaoRemoverAssunto').style.display = 'none';
        }

        // Se o número de assuntos for menor que 5, reexibe o botão de adicionar
        if (contadorAssuntos < 5) {
            document.getElementById('ibotaoAdicionarAssunto').style.display = 'inline';
        }
    }
}

let contadorCoorientador = 1; // Começa com 1 porque já existe um campo de coorientador

function adicionarCoorientador() {
    if (contadorCoorientador < 5) {
        contadorCoorientador++; // Incrementa o contador

        // Cria um novo contêiner para os inputs
        const novoContainer = document.createElement('div');
        novoContainer.className = 'nome_sobrenome';

        // Cria um novo input para o nome do coorientador
        const novoCoorientadorNome = document.createElement('div');
        novoCoorientadorNome.className = 'nome';
        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.name = 'nomeCoorientador' + contadorCoorientador;
        inputNome.pattern = '[A-Za-zÀ-ÿ\\s]+';
        inputNome.title = 'Apenas letras e espaços são permitidos.';
        inputNome.placeholder = 'Nome:';
        inputNome.required = true;
        novoCoorientadorNome.appendChild(inputNome);

        // Cria um novo input para o sobrenome do coorientador
        const novoCoorientadorSobrenome = document.createElement('div');
        novoCoorientadorSobrenome.className = 'sobrenome';
        const inputSobrenome = document.createElement('input');
        inputSobrenome.type = 'text';
        inputSobrenome.name = 'sobrenomeCoorientador' + contadorCoorientador;
        inputSobrenome.pattern = '[A-Za-zÀ-ÿ\\s]+';
        inputSobrenome.title = 'Apenas letras e espaços são permitidos.';
        inputSobrenome.placeholder = 'Sobrenome:';
        inputSobrenome.required = true;
        novoCoorientadorSobrenome.appendChild(inputSobrenome);

        // Adiciona os novos inputs ao novo contêiner
        novoContainer.appendChild(novoCoorientadorNome);
        novoContainer.appendChild(novoCoorientadorSobrenome);

        // Adiciona o novo contêiner ao contêiner de coorientadores
        const divCoorientador = document.getElementById('divCoorientador');
        divCoorientador.appendChild(novoContainer);

        // Se atingir o limite de 5 coorientadores, esconde o botão de adicionar
        if (contadorCoorientador === 5) {
            document.getElementById('ibotaoAdicionarCoorientador').style.display = 'none';
        }

        if (contadorCoorientador > 1) {
            document.getElementById('ibotaoRemoverCoorientador').style.display = 'inline';
        }
    }
}

function removerCoorientador() {
    if (contadorCoorientador > 1) {
        const divCoorientador = document.getElementById('divCoorientador');
        
        // Remove o último contêiner de coorientador
        divCoorientador.removeChild(divCoorientador.lastChild); // Remove o último conjunto de nome e sobrenome

        contadorCoorientador--; // Decrementa o contador

        // Esconde o botão "Remover Coorientador" se restar apenas 1 coorientador
        if (contadorCoorientador === 1) {
            document.getElementById('ibotaoRemoverCoorientador').style.display = 'none';
        }

        // Se o número de coorientadores for menor que 5, reexibe o botão de adicionar
        if (contadorCoorientador < 5) {
            document.getElementById('ibotaoAdicionarCoorientador').style.display = 'inline';
        }
    }
}
function validarAno() {
    const inputAno = document.getElementById('iano');
    const anoAtual = new Date().getFullYear();
    const anoInserido = parseInt(inputAno.value, 10);

    if (anoInserido > anoAtual) {
        inputAno.value = anoAtual;
        SVGSwitchElement.error(`O ano não pode ser maior que ${anoAtual}. O valor foi ajustado para o ano atual.`);
    }
}
function mostrarSelect() {
    // Oculta todos os selects de início
    document.getElementById("selectGraduacao").style.display = "none";
    document.getElementById("selectPosGraduacao").style.display = "none";
    document.getElementById("selectEspecializacao").style.display = "none";
    
    // Verifica qual radio está selecionado e exibe o select correspondente
    const modalidadeSelecionada = document.querySelector('input[name="modalidade"]:checked');

    if (modalidadeSelecionada) {
        const valorSelecionado = modalidadeSelecionada.value;
        
        if (valorSelecionado === "Graduacao") {
            document.getElementById("selectGraduacao").style.display = "block";
        } else if (valorSelecionado === "PosGraduacao") {
            document.getElementById("selectPosGraduacao").style.display = "block";
        } else if (valorSelecionado === "Especializacao") {
            document.getElementById("selectEspecializacao").style.display = "block";
        }
    }
}



