function titleize(text) {
    // Lista de palavras que não devem ser capitalizadas
    const exceptions = ["de", "da", "dos", "das", "do", "e"];
    
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");

    for (var a = 0; a < words.length; a++) {
        var w = words[a];

        // Capitaliza a palavra se não estiver na lista de exceções ou se for a primeira palavra
        if (exceptions.indexOf(w) === -1 || a === 0) {
            var firstLetter = w.charAt(0);
            w = firstLetter.toUpperCase() + w.slice(1);
        }

        words[a] = w;
    }

    return words.join(" ");
}

// Função para aplicar titleize a um campo de input
function aplicarTitleize(inputId) {
    const input = document.getElementById(inputId);
    input.value = titleize(input.value);
}

// Função genérica para aplicar titleize diretamente ao valor do input
function aplicarTitleizeElement(element) {
    element.value = titleize(element.value);
}

let contadorCoorientador = 1;

// Função para adicionar coorientador
function adicionarCoorientador() {
    if (contadorCoorientador < 5) {
        contadorCoorientador++;

        const novoContainer = document.createElement('div');
        novoContainer.className = 'nome_sobrenome';

        // Cria o campo de Nome do coorientador
        const novoCoorientadorNome = document.createElement('div');
        novoCoorientadorNome.className = 'nome';
        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.name = 'nomeCoorientador' + contadorCoorientador;
        inputNome.placeholder = 'Nome completo sem o último sobrenome:';
        inputNome.required = true;
        inputNome.oninput = function() {
            aplicarTitleizeElement(inputNome); // Aplica titleize diretamente ao campo
        };
        novoCoorientadorNome.appendChild(inputNome);

        // Cria o campo de Sobrenome do coorientador
        const novoCoorientadorSobrenome = document.createElement('div');
        novoCoorientadorSobrenome.className = 'sobrenome';
        const inputSobrenome = document.createElement('input');
        inputSobrenome.type = 'text';
        inputSobrenome.name = 'sobrenomeCoorientador' + contadorCoorientador;
        inputSobrenome.placeholder = 'Último sobrenome:';
        inputSobrenome.required = true;
        inputSobrenome.oninput = function() {
            aplicarTitleizeElement(inputSobrenome); // Aplica titleize diretamente ao campo
        };
        novoCoorientadorSobrenome.appendChild(inputSobrenome);

        // Adiciona os campos de nome e sobrenome ao container
        novoContainer.appendChild(novoCoorientadorNome);
        novoContainer.appendChild(novoCoorientadorSobrenome);

        // Adiciona o novo container ao div principal de coorientadores
        const divCoorientador = document.getElementById('divCoorientador');
        divCoorientador.appendChild(novoContainer);

        // Controla a exibição dos botões adicionar/remover
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
        
        // Remove o último container de coorientador adicionado
        divCoorientador.removeChild(divCoorientador.lastChild);

        contadorCoorientador--; // Decrementa o contador

        // Esconde o botão "Remover" se restar apenas 1 coorientador
        if (contadorCoorientador === 1) {
            document.getElementById('ibotaoRemoverCoorientador').style.display = 'none';
        }

        // Reexibe o botão "Adicionar" se o número de coorientadores for menor que 5
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