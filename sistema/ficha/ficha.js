let contadorCoorientador = 0;

function adicionarCoorientador() {
    if (contadorCoorientador < 5) {
        contadorCoorientador++;

        const novoContainer = document.createElement('div');
        novoContainer.className = 'nome_sobrenome';
        novoContainer.id = 'coorientador' + contadorCoorientador;

        // Cria o campo de Nome do coorientador
        const novoCoorientadorNome = document.createElement('div');
        novoCoorientadorNome.className = 'nome';
        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.name = 'nomeCoorientador' + contadorCoorientador;
        inputNome.placeholder = 'Nome completo sem o último sobrenome:';
        inputNome.id = 'inomeCoorientador' + contadorCoorientador;
        inputNome.oninput = function() {
            aplicarTitleizeElement(inputNome);
            validarCamposCoorientador(contadorCoorientador);
        };
        novoCoorientadorNome.appendChild(inputNome);

        // Cria o campo de Sobrenome do coorientador
        const novoCoorientadorSobrenome = document.createElement('div');
        novoCoorientadorSobrenome.className = 'sobrenome';
        const inputSobrenome = document.createElement('input');
        inputSobrenome.type = 'text';
        inputSobrenome.name = 'sobrenomeCoorientador' + contadorCoorientador;
        inputSobrenome.placeholder = 'Último sobrenome:';
        inputSobrenome.id = 'isobrenomeCoorientador' + contadorCoorientador;
        inputSobrenome.oninput = function() {
            aplicarTitleizeElement(inputSobrenome);
            validarCamposCoorientador(contadorCoorientador);
        };
        novoCoorientadorSobrenome.appendChild(inputSobrenome);

        // Cria o checkbox com o estilo personalizado
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper-34';

        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.className = 'tgl tgl-ios';
        inputCheckbox.id = 'icoCoorientadora' + contadorCoorientador;
        inputCheckbox.name = 'coorientadora' + contadorCoorientador;
        inputCheckbox.title = 'Coorientadora';

        const labelCheckboxBtn = document.createElement('label');
        labelCheckboxBtn.className = 'tgl-btn';
        labelCheckboxBtn.setAttribute('for', inputCheckbox.id);

        const labelCheckboxText = document.createElement('label');
        labelCheckboxText.setAttribute('for', inputCheckbox.id);
        labelCheckboxText.textContent = 'Coorientadora';

        // Adiciona o checkbox e o label ao container
        checkboxWrapper.appendChild(inputCheckbox);
        checkboxWrapper.appendChild(labelCheckboxBtn);
        checkboxWrapper.appendChild(labelCheckboxText);

        // Adiciona os campos de nome, sobrenome e checkbox ao container
        novoContainer.appendChild(novoCoorientadorNome);
        novoContainer.appendChild(novoCoorientadorSobrenome);
        novoContainer.appendChild(checkboxWrapper);

        // Adiciona o novo container ao div principal de coorientadores
        const divCoorientador = document.getElementById('divCoorientador');
        divCoorientador.appendChild(novoContainer);

        // Esconde o botão "Adicionar" se o limite de 5 coorientadores for atingido
        if (contadorCoorientador >= 5) {
            document.getElementById('ibotaoAdicionarCoorientador').style.display = 'none';
        }

        // Exibe o botão "Remover" caso mais de 0 coorientadores existam
        if (contadorCoorientador > 0) {
            document.getElementById('ibotaoRemoverCoorientador').style.display = 'inline';
        }
    }
}

function removerCoorientador() {
    if (contadorCoorientador > 0) {
        const divCoorientador = document.getElementById('divCoorientador');

        // Remove o último container de coorientador adicionado
        const containerRemover = document.getElementById('coorientador' + contadorCoorientador);
        divCoorientador.removeChild(containerRemover);

        contadorCoorientador--; // Decrementa o contador

        // Esconde o botão "Remover" se não houver coorientadores
        if (contadorCoorientador === 0) {
            document.getElementById('ibotaoRemoverCoorientador').style.display = 'none';
        }

        // Reexibe o botão "Adicionar" se o número de coorientadores for menor que 5
        if (contadorCoorientador < 5) {
            document.getElementById('ibotaoAdicionarCoorientador').style.display = 'inline';
        }
    }
}

function limparEspacos(form) {
    // Seleciona todos os elementos de input no formulário
    const inputs = form.querySelectorAll('input[type="text"]');

    // Remove os espaços extras em cada input
    inputs.forEach(input => {
        input.value = input.value.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    });
}

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

let contadorAssuntos = 1; // Inicializa o contador de assuntos

function adicionarAssunto() {
    if (contadorAssuntos < 5) {
        contadorAssuntos++; // Incrementa o contador

        // Cria um novo input para o assunto
        const novoAssunto = document.createElement('input');
        novoAssunto.type = 'text';
        novoAssunto.name = 'assunto' + contadorAssuntos;
        novoAssunto.placeholder = 'Assunto ' + contadorAssuntos;
        novoAssunto.required = true;
        novoAssunto.oninput = function() {
            limparEspacos(novoAssunto);  // Aplica a limpeza de espaços
        };

        // Adiciona o novo input ao contêiner de assuntos
        const divAssuntos = document.getElementById('assuntosContainer');
        divAssuntos.appendChild(novoAssunto);

        // Se o contador for igual a 5, esconde o botão
        if (contadorAssuntos === 5) {
            document.getElementById('ibotaoAdicionarAssunto').style.display = 'none';
        }

        // Exibe o botão de remover se o número de assuntos for maior que 1
        if (contadorAssuntos > 1) {
            document.getElementById('ibotaoRemoverAssunto').style.display = 'inline';
        }
    }
}

function removerAssunto() {
    if (contadorAssuntos > 1) {
        const divAssuntos = document.getElementById('assuntosContainer');
        
        // Remove o último input de assunto adicionado
        divAssuntos.removeChild(divAssuntos.lastChild);

        contadorAssuntos--; // Decrementa o contador

        // Esconde o botão "Remover Assunto" se restar apenas 1 assunto
        if (contadorAssuntos === 1) {
            document.getElementById('ibotaoRemoverAssunto').style.display = 'none';
        }

        // Reexibe o botão de adicionar se o número de assuntos for menor que 5
        if (contadorAssuntos < 5) {
            document.getElementById('ibotaoAdicionarAssunto').style.display = 'inline';
        }
    }
}

function mostrarSelect() {
    // Oculta todos os selects
    const selects = ["selectGraduacao", "selectPosGraduacao", "selectEspecializacao"];
    selects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        if (selectElement) {
            selectElement.style.display = "none";
        }
    });

    // Oculta opções adicionais específicas de Pós-Graduação
    const posGraduacaoOptions = document.getElementById("opcaoPosGraduacao");
    if (posGraduacaoOptions) {
        posGraduacaoOptions.style.display = "none";
    }

    const modalidadeSelecionada = document.querySelector('input[name="modalidade"]:checked');

    // Exibe o select correspondente ao rádio selecionado
    if (modalidadeSelecionada) {
        const valorSelecionado = modalidadeSelecionada.value;

        if (valorSelecionado === "Graduacao") {
            const selectGraduacao = document.getElementById("selectGraduacao");
            if (selectGraduacao) {
                selectGraduacao.style.display = "block";
            }
        } else if (valorSelecionado === "PosGraduacao") {
            const selectPosGraduacao = document.getElementById("selectPosGraduacao");
            const opcaoPosGraduacao = document.getElementById("opcaoPosGraduacao");

            if (selectPosGraduacao) {
                selectPosGraduacao.style.display = "block";
            }
            if (opcaoPosGraduacao) {
                opcaoPosGraduacao.style.display = "block";
            }
        } else if (valorSelecionado === "Especializacao") {
            const selectEspecializacao = document.getElementById("selectEspecializacao");
            if (selectEspecializacao) {
                selectEspecializacao.style.display = "block";
            }
        }
    }
}
