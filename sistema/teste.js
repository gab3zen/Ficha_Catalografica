let contadorCoorientador = 1;

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

        // Cria o checkbox com o estilo personalizado
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper-34';

        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.className = 'tgl tgl-ios'; // Classe para aplicar o estilo
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

        // Exibe o botão "Remover" caso mais de 1 coorientador exista
        if (contadorCoorientador > 1) {
            document.getElementById('ibotaoRemoverCoorientador').style.display = 'inline';
        }

        // Esconde o botão "Adicionar" se o limite de 5 coorientadores for atingido
        if (contadorCoorientador >= 5) {
            document.getElementById('ibotaoAdicionarCoorientador').style.display = 'none';
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

        // Adiciona o novo input ao contêiner de assuntos
        const divAssuntos = document.getElementById('assuntosContainer');
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
        const divAssuntos = document.getElementById('assuntosContainer');
        
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
    // Oculta todos os selects e remove o atributo 'required' de todos eles
    const selects = ["selectGraduacao", "selectPosGraduacao", "selectEspecializacao"];
    selects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        selectElement.style.display = "none";
        selectElement.querySelector("select").removeAttribute("required");
    });
    
    // Verifica qual radio está selecionado e exibe o select correspondente, adicionando o 'required' apenas a ele
    const modalidadeSelecionada = document.querySelector('input[name="modalidade"]:checked');

    if (modalidadeSelecionada) {
        const valorSelecionado = modalidadeSelecionada.value;
        
        if (valorSelecionado === "Graduacao") {
            document.getElementById("selectGraduacao").style.display = "block";
            document.getElementById("cursoGraduacao").setAttribute("required", "required");
        } else if (valorSelecionado === "PosGraduacao") {
            document.getElementById("selectPosGraduacao").style.display = "block";
            document.getElementById("cursoPosGraduacao").setAttribute("required", "required");
        } else if (valorSelecionado === "Especializacao") {
            document.getElementById("selectEspecializacao").style.display = "block";
            document.getElementById("cursoEspecializacao").setAttribute("required", "required");
        }
    }
}

mostrarSelect();

